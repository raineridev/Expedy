const dayjs = require('dayjs')

export function setDateFormat(date: Date, format: string): string { 
    return dayjs(date).format('DD/MM/YYYY - HH:mm');
}

export function setDateFormatToData(data: any, format: string, dataIndex: string): any {
     data[dataIndex] = dayjs(data[dataIndex]).format(format);
     return data;
}