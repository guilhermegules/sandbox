function timeConversion(time12Hours) {
    const [hours, minutes, seconsWithTimeFrame] = time12Hours.split(":");
    const seconds = seconsWithTimeFrame.slice(0, 2);
    const timeFrame = seconsWithTimeFrame.slice(2);
    let formattedHour = Number(hours);
    
    if(Number(hours) > 12 || isNaN(hours)) throw new Error('Invalid time');

    if(timeFrame === 'PM' && Number(hours) !== 12) {
        formattedHour += 12;
    } else if(Number(hours) === 12 && timeFrame === 'AM') {
        formattedHour = '00';
    } else {
        formattedHour = hours;
    }
        
    return `${formattedHour}:${minutes}:${seconds}`;
}
