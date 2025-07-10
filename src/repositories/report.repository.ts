import { handleDateParameters } from "../../utils/handle-params.util";
import { orderModel } from "../entities/order.entity";
import { OrderReportFilters, FilterConfig } from "../types/report.types";

const filters: Record<string, FilterConfig> = {
    date: { tag: 'date', type: 'date' },
    status_hub: { tag: 'status_hub', type: 'string' },
    integration: { tag: 'integracao.tipo', type: 'string' },
};

export async function getOrderReportData(queryFilters: OrderReportFilters) {
    try {
        const mongoFilters: Record<string, any> = {};
        Object.keys(queryFilters).forEach((filterKey) => {
            if (!Object.prototype.hasOwnProperty.call(filters, filterKey)) return;
            
            const filter = filters[filterKey];
            if (!filter) return;
            
            const value = queryFilters[filterKey];
            if (!value) return;
            
            switch (filter.type) {
                case 'string':
                    mongoFilters[filter.tag] = value;
                    break;
                case 'number':
                    const numValue = parseFloat(value);
                    if (!isNaN(numValue)) {
                        mongoFilters[filter.tag] = numValue;
                    }
                    break;
                case 'date':
                    const { startPeriod, endPeriod } = queryFilters;
                    mongoFilters[filter.tag] = handleDateParameters(
                        startPeriod || '', 
                        endPeriod || ''
                    );
                    break;
            }
        });
        mongoFilters.company = '3';
        const aggregateResult = await orderModel.aggregate([
                    { $match: mongoFilters },
                    {
                        $facet: {
                        orders: [
                            {
                            $project: {
                                total: 1,
                                date: 1,
                                status_hub: 1,
                                shipment_value: 1,
                                product: {
                                $let: {
                                    vars: {
                                    firstProduct: { $arrayElemAt: ["$ProductsSold", 0] }
                                    },
                                    in: {
                                    $ifNull: ["$$firstProduct.original_name", "$$firstProduct.database_name"]
                                    }
                                },
                                },
                                "integracao": "$integracao.name",
                                _id: 0
                            }
                            }
                        ],
                    statistics: [
                        {
                            $group: {
                                _id: null,
                                totalDocuments: { $sum: 1 },
                                totalShipmentValue: { $sum: "$shipment_value" },
                                totalOrderValue: { $sum: "$total" },
                            }
                        },
                        {
                        $project: {
                        _id: 0,
                        totalDocuments: 1,
                        totalShipmentValue: 1,
                        totalOrderValue: 1,
                        totalProfit: {
                        $multiply: ["$totalOrderValue", 0.1]
                        }
                    }
                        }
                    ]
                        }
                    },
                    {
                        $addFields: {
                            statistics: { $arrayElemAt: ["$statistics", 0] }
                        }
                    }
                    ]);

    const result = {aggregateResult}
    return result;
    } catch (error) {
        throw new Error(`Database query failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}
