const dayjs = require('dayjs')

export function setDateFormat(dateInput: Date, dateFormat: string): string { 
    return dayjs(dateInput).format('DD/MM/YYYY - HH:mm');
}

export function setDateFormatToData(dataObject: any, dateFormat: string, datePropertyIndex: string): any {
     dataObject[datePropertyIndex] = dayjs(dataObject[datePropertyIndex]).format(dateFormat);
     return dataObject;
}