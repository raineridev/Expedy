import { setDateFormatToData } from "../../utils/DateFormat";

const ExcelJS = require('exceljs');
const path = require('path');

export function setWorkbook(creator: string, lastModifiedBy: string, ) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = creator;
    workbook.lastModifiedBy = lastModifiedBy;
    workbook.created = new Date();

    return workbook;
}

export function setWorksheet(workbook: any, name: string, worksheetData: Array<object>) {
    const worksheet = workbook.addWorksheet(name);
    const columns = worksheetData;
    worksheet.columns = columns;

    return worksheet;
}
    

export function setColumns(worksheet: any, data: Array<object>) {
    data.forEach((dataRow : Object, i) => {
        setDateFormatToData(dataRow, 'DD/MM/YYYY - HH:mm', 'data_venda');
        worksheet.addRow(dataRow);
    });
}

export function setStyleColumns(worksheet: any) {
    worksheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };
    worksheet.getRow(1).font = { bold: true};
    worksheet.getRow(1).views = [{ state: 'frozen', ySplit: 1 }];
    for (let i = 2; i <= worksheet.columnCount; i++) {
        if((i % 2) === 0) {
         const col = worksheet.getRow(i);
        col.width = 20;
        col.style = { alignment: { horizontal: 'center' } };
        col.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDDDDDD' } };   
        }
    }
}


export async function createSheet(workbook: any) {
    const filePath = path.resolve('xlsPath', `${Date.now()}-test.xls`)
    await workbook.xlsx.writeFile(filePath);
    return filePath
}