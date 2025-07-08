const dayjs = require('dayjs')


export function handleDateParameters(startPeriod : string, endPeriod: string) {
    if(!startPeriod && !endPeriod) {
        return {
            $gte: new Date(dayjs().subtract(1, 'month')),
            $lte: new Date()
        };
    }
    if(!startPeriod && endPeriod) {
        return {
            $gte: new Date(dayjs().subtract(1, 'month')),
            $lte: new Date(endPeriod)
        };
    }
    if(startPeriod && !endPeriod) {
        return {
            $gte: new Date(startPeriod),
            $lte: new Date()
        };
    }
    return {
        $gte: new Date(startPeriod),
        $lte: new Date(endPeriod)
    };
}