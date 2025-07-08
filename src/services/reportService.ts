import { setDateFormatToData } from "../../utils/DateFormat";

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
    rowsData.forEach((rowDataObject: Object, rowIndex: number) => {
        setDateFormatToData(rowDataObject, 'DD/MM/YYYY - HH:mm', 'data_venda');
        targetWorksheet.addRow(rowDataObject);
    });
}

export function setStyleColumns(targetWorksheet: any) {
    targetWorksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    targetWorksheet.getRow(1).font = { bold: true};
    targetWorksheet.getRow(1).views = [{ state: 'frozen', ySplit: 1 }];
    for (let columnIndex = 2; columnIndex <= targetWorksheet.columnCount; columnIndex++) {
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