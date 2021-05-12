const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const months = {
    January: 0,
    February: 1,
    March: 2,
    April: 3,
    May: 4,
    June: 5,
    July: 6,
    August: 7,
    September: 8,
    October: 9,
    November: 10,
    Decmber: 11,
};

export function isLeapYear(year: number) {
    return !(year % 4 || (!(year % 100) && year % 400));
}

export function getDaysInMonth(date: Date) {
    const month = date.getMonth();
    const year = date.getFullYear();

    if (isLeapYear(year) && month === months.February) {
        return daysInMonth[month] + 1;
    } else {
        return daysInMonth[month];
    }
}

export function getDaysOfWeek(date: Date) {
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) {
        return 6;
    } else {
        return dayOfWeek - 1;
    }
}

export function getMonthData(year: number, month: number) {
    const result: any = [];
    const daysInWeek = 7;
    const date = new Date(year, month);
    const daysInMonth = getDaysInMonth(date);
    const monthStartsOn = getDaysOfWeek(date);
    
    let day = 1;
    for (let i = 0; i < (daysInMonth + monthStartsOn) / daysInWeek; i++) {
        result[i] = [];

        for (let j = 0; j < daysInWeek; j++) {
            if ((i === 0 && j < monthStartsOn) || day > daysInMonth) {
                result[i][j] = undefined;
            } else {
                result[i][j] = new Date(year, month, day++);
            }
        }
    }
    return result;
}
