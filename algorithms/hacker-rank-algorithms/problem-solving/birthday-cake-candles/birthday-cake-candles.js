function birthdayCakeCandles(candles) {
    const maxValue = Math.max(...candles);
        
    const tallestCandles = candles.filter(candle => candle === maxValue);
    
    return tallestCandles.length
}
