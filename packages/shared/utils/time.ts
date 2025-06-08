import { format, toZonedTime } from 'date-fns-tz';
export const formatDateBangkok = () => {
    const formatDateInBangkok = (date: Date, timeZone: string): string => {
        const zonedDate = toZonedTime(date, timeZone); // Convert to Bangkok timezone
        return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss", { timeZone }); // No timezone offset
    };
    const now = new Date();
    return formatDateInBangkok(now, 'Asia/Bangkok');
}

export const formatDateWithTimeZone = (date: Date, timeZone: string): string => {
    const zonedDate = toZonedTime(date, timeZone); // Convert to Bangkok timezone
    return format(zonedDate, "yyyy-MM-dd'T'HH:mm:ss", { timeZone }); // No timezone offset
};