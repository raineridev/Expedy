const ExcelJS = require('exceljs');
const path = require('path');

export async function setWorkbook(creator: string, lastModifiedBy: string, ) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = creator;
    workbook.lastModifiedBy = lastModifiedBy;
    workbook.created = new Date();

    return workbook;
}

export async function setWorksheet(workbook: any, name: string, worksheetData: Array<object>) {
    const worksheet = workbook.addWorksheet(name);
    const columns = worksheetData;
    console.log('Columns:', columns);
    worksheet.columns = columns;

    return worksheet;
}
    

export async function setColumns(worksheet: any, data: Array<object>) {
     worksheet.addRow(...data);
}

export async function createSheet(workbook: any) {
    const filePath = path.resolve('xlsPath', `${Date.now()}-test.xls`)
    await workbook.xlsx.writeFile(filePath);
    return filePath
} 

export async function test() {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Test');
    worksheet.columns = [
        { header: 'ID', key: 'id', width: 20 },
        { header: 'Data da Venda', key: 'data_venda', width: 20 },
        { header: 'ID Pedido Marketplace', key: 'id_marketplace', width: 25 },
        { header: 'Nome do Comprador', key: 'nome_comprador', width: 25 },
        { header: 'Marketplace', key: 'marketplace', width: 20 },
        { header: 'ID Integração', key: 'integracao_id', width: 20 },
        { header: 'Integração', key: 'integracao_name', width: 20 },
        { header: 'Valor Total da Venda (R$)', key: 'total', width: 25 },{ header: 'Valor do lucro (R$)', key: 'lucro', width: 25 },
        { header: 'Lucro (%)', key: 'lucro_percent', width: 25 }
    ];

    const filePath = path.resolve('xlsPath', `${Date.now()}-test.xls`)
    await workbook.xlsx.writeFile(filePath);
    return filePath

}