import { setDateFormatToData } from "../../utils/date-format.util";
import { getOrderReportData } from "../repositories/report.repository";
import { OrderReportFilters, ExcelFooter } from "../types/report.types";

const ExcelJS = require('exceljs');
const path = require('path');

export function setWorkbook(creatorName: string, lastModifiedByName: string) {
    const excelWorkbook = new ExcelJS.Workbook();
    excelWorkbook.creator = creatorName;
    excelWorkbook.lastModifiedBy = lastModifiedByName;
    excelWorkbook.created = new Date();

    return excelWorkbook;
}

export function setWorksheet(excelWorkbook: any, worksheetName: string, columnDefinitions: Array<object>) {
    const newWorksheet = excelWorkbook.addWorksheet(worksheetName);
    const worksheetColumns = columnDefinitions;
    newWorksheet.columns = worksheetColumns;

    return newWorksheet;
}

export function setColumns(targetWorksheet: any, rowsData: Array<object>) {
    rowsData.forEach((rowDataObject: Object) => {
        const rowDataWithNewDateObject = setDateFormatToData(rowDataObject, 'DD/MM/YYYY - HH:mm', 'date');
        targetWorksheet.addRow(rowDataWithNewDateObject);
    });
}

export function setStyleColumns(targetWorksheet: any) {
    targetWorksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    targetWorksheet.getRow(1).font = { bold: true};
    targetWorksheet.getRow(1).views = [{ state: 'frozen', ySplit: 1 }];
    for (let columnIndex = 2; columnIndex <= targetWorksheet.rowCount; columnIndex++) {
        if((columnIndex % 2) === 0) {
         const currentColumn = targetWorksheet.getRow(columnIndex);
        currentColumn.width = 20;
        currentColumn.style = { alignment: { horizontal: 'center' } };
        currentColumn.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDDDDD' } };   
        }
    }
}

export async function createSheet(excelWorkbook: any) {
    const outputFilePath = path.resolve('xlsPath', `${Date.now()}-test.xls`)
    await excelWorkbook.xlsx.writeFile(outputFilePath);
    return outputFilePath;
}

export async function generateOrderReport(filters: OrderReportFilters) {
    try {
        const reportResult = await getOrderReportData(filters);
        
        await generateExcelReport(reportResult);
        
        return reportResult;
    } catch (error) {
        console.error('Error in generateOrderReport service:', error);
        throw new Error(`Failed to generate order report: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

export async function generateExcelReport(reportData: any) {
    const excelWorkbook = setWorkbook('Expedy System', 'Report Generator');
    
    const reportColumnDefinitions = [
        { header: 'Integração', key: 'integracao', width: 20 },
        { 
            header: 'Valor do frete', 
            key: 'shipment_value', 
            width: 20, 
            style: { alignment: { horizontal: 'center' } }, 
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDDDDD' } } 
        },
        { 
            header: 'Valor do pedido', 
            key: 'total', 
            width: 20, 
            style: { alignment: { horizontal: 'center' } }, 
            fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDDDDD' } } 
        },
        { header: 'Data da venda', key: 'date', width: 25 },
        { header: 'Status da Hub', key: 'status_hub', width: 15 },
        { header: 'Nome do produto', key: 'product', width: 30 },
    ];

    const reportWorksheet = setWorksheet(excelWorkbook, 'Order Report', reportColumnDefinitions);
    
    const orders = reportData.aggregateResult?.[0]?.orders || [];
    const statistics = reportData.aggregateResult?.[0]?.statistics || {};
    const footerData : ExcelFooter = {
        integracao: {value: 'TOTAL: '},
        shipment_value:  {value: statistics.totalShipmentValue},
        total: {value: statistics.totalOrderValue},
        date: { value: `${Number(statistics.totalProfit).toFixed(2)} lucro`},
        status_hub: {value: `${statistics.totalDocuments} Registros`},
    };
    setColumns(reportWorksheet, orders);
    createFooter(reportWorksheet, footerData);
    setStyleColumns(reportWorksheet);
    return await createSheet(excelWorkbook);
}

function getNext (char: string, step = 0) {
  const startCode = 'A'.charCodeAt(0) 
  const charCode = char.toUpperCase().charCodeAt(0) 


  const newCode = startCode + ((charCode - startCode + step) % 26)
  return String.fromCharCode(newCode)
}

export function createFooter(worksheet : any, dataFooter: ExcelFooter ) {
    const rowCount = worksheet.rowCount;
    Object.keys(dataFooter).forEach((item, key) => {
        let data = dataFooter[item];
        if(typeof data.value === 'number') {
            data.value = Number(data.value).toFixed(2);
        }
        worksheet.getCell(getNext('A', key) + (rowCount + 5)).value = data.value;
    });
}