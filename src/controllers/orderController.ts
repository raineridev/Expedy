import { Request, Response } from "express";
import { OrderType } from '../types/orderType'; 
import { OrderSearchType } from '../types/orderSearchType';
import {  createOrder, getOrder, deleteOrder, updateOrder, searchOrder } from '../services/orderService';
import { setWorkbook, setWorksheet, setColumns, createSheet, setStyleColumns } from '../services/reportService';
import { sheetToUpperCase } from "../../utils/ExcelUtils";

export async function store(req: Request, res: Response) {
    const orderData: OrderType = req.body;
    const order = await createOrder(orderData, parseInt(req.headers['x-user-id'] as string));
    res.status(201).json(order);
}

export async function get(req: Request, res: Response) {
    const orderId = parseInt(req.params.id);
    const orderDetails = await getOrder(orderId);
    
    const excelWorkbook = setWorkbook('Expedy System', 'Report Generator');
    const reportColumnDefinitions = [
        { header: 'ID', key: 'id', width: 20 },
        { header: 'Data da Venda', key: 'data_venda', width: 20,  style: {alignment: { horizontal: 'center' } }, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDDDDD' } } },
        { header: 'ID Pedido Marketplace', key: 'id_marketplace', width: 25 },
        { header: 'Nome do Comprador', key: 'nome_comprador', width: 25 },
        { header: 'Marketplace', key: 'marketplace', width: 20 },
        { header: 'ID Integração', key: 'integracao_id', width: 20 },
        { header: 'Integração', key: 'integracao_name', width: 20 },
        { header: 'Valor Total da Venda (R$)', key: 'total', width: 25 },
        { header: 'Valor do lucro (R$)', key: 'lucro', width: 25 },
        { header: 'Lucro (%)', key: 'lucro_percent', width: 25 }
];
    const reportWorksheet = setWorksheet(excelWorkbook, 'Order Report', reportColumnDefinitions);
    const sampleOrderData = sheetToUpperCase([{
        "id": 12345,
        "data_venda": "2025-07-01T14:30:00Z",
        "id_marketplace": "MP-987654",
        "nome_comprador": "João da Silva",
        "marketplace": "Mercado Livre",
        "integracao_id": 42,
        "integracao_name": "Bling",
        "total": 199.90,
        "lucro": 80.00,
        "lucro_percent": 40.05
},
{
        "id": 12345,
        "data_venda": "2025-07-01T14:30:00Z",
        "id_marketplace": "MP-987654",
        "nome_comprador": "João da Silva",
        "marketplace": "Mercado Livre",
        "integracao_id": 42,
        "integracao_name": "Bling",
        "total": 199.90,
        "lucro": 80.00,
        "lucro_percent": 40.05
},
{
        "id": 12345,
        "data_venda": "2025-07-01T14:30:00Z",
        "id_marketplace": "MP-987654",
        "nome_comprador": "João da Silva",
        "marketplace": "Mercado Livre",
        "integracao_id": 42,
        "integracao_name": "Bling",
        "total": 199.90,
        "lucro": 80.00,
        "lucro_percent": 40.05
}]);
    setColumns(reportWorksheet, sampleOrderData);
    setStyleColumns(reportWorksheet);
    createSheet(excelWorkbook);
    res.status(200).json(orderDetails);
}

export async function destroy(req: Request, res: Response) {
    const orderId = parseInt(req.params.id);
    const deletedOrder = await deleteOrder(orderId);
    res.status(200).json();
}

export async function update(req: Request, res: Response) {
    const orderId = parseInt(req.params.id);
    const orderUpdateData: OrderType = req.body;
    const updatedOrder = await updateOrder(orderId, orderUpdateData);
    res.status(200).json(updatedOrder);
}

export async function search(req: Request, res: Response) {
    const searchCriteria: OrderSearchType = req.query as unknown as OrderSearchType;
    const foundOrders = await searchOrder(searchCriteria);
    res.status(200).json(foundOrders);
}