
export const dateFormat = (date: string) => {

    const zoneHours = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: zoneHours,
    };

    const formatter = new Intl.DateTimeFormat('es-ES', options);
    return formatter.format(new Date(date));

}