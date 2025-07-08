import { handleDateParameters } from "../../utils/handle-params.util";
import { orderModel } from "../entities/order.entity";
import { Request, Response } from "express";
import { createSheet, setColumns, setStyleColumns, setWorkbook, setWorksheet } from "../services/report.service";

export async function getOrderReportData(req: Request, res: Response) {
    const { start_period, endPeriod, status_bob, integration } = req.query;
    
    console.log('Query Parameters:', start_period, endPeriod, status_bob, integration);
    console.log(handleDateParameters(start_period as string, endPeriod as string));
    const orderData = await orderModel.find({
        company: "3",
        "integracao.id": "31632",
        status_hub: "cancelado",
        date: {
            $gte: new Date('2022-07-18T11:47:06.000+00:00'),
            $lte: new Date('2026-01-18T11:47:06.000+00:00')
        }
    }, {
        total: 1,
        date: 1,
        status_hub: 1,
        shipment_value: 1,
        "ProductsSold.original_name": 1,
        "ProductsSold.database_name": 1,
        "integracao.name": 1,
         _id: 0
        }).lean();
    console.log('Order Data:', orderData);
    const excelWorkbook = setWorkbook('Expedy System', 'Report Generator');
    const reportColumnDefinitions = [
            { header: 'Integração', key: 'integracao_name', width: 20 },
            { header: 'Valor do frete', key: 'shipment_value', width: 20,  style: {alignment: { horizontal: 'center' } }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDDDDD' } } },
            { header: 'Valor do pedido', key: 'total', width: 20,  style: {alignment: { horizontal: 'center' } }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDDDDD' } } },
            { header: 'Data da venda', key: 'date', width: 25 },
            { header: 'Status da Hub', key: 'status_hub', width: 15 },
            { header: 'Nome do produto', key: 'product_name', width: 30 },
    ];
    orderData.forEach((order: any) => {
        order.ProductsSold.forEach((product: any) => {
            order.integracao_name = order.integracao.name
            order.product_name = product.original_name ? product.original_name : product.database_name;
        });
    });

    const reportWorksheet = setWorksheet(excelWorkbook, 'Order Report', reportColumnDefinitions);
    setColumns(reportWorksheet, orderData);
    setStyleColumns(reportWorksheet);
    createSheet(excelWorkbook);

    res.status(201).json(orderData);
}
