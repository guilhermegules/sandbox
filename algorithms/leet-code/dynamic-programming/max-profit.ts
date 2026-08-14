function maxProfit(prices: number[]): number {
    let profit = 0;
    let minPrice = Infinity;

    for (let i = 0; i < prices.length; i++) {
        if (prices[i] < minPrice) {
            minPrice = prices[i];
        }

        if (prices[i] - minPrice > profit) {
            profit = prices[i] - minPrice
        }
    }

    return profit;
};

function maxProfit2(prices: number[]): number {
    let profit = 0;
    let minPrice = Infinity;

    for (const price of prices) {
        minPrice = Math.min(minPrice, price);
        profit = Math.max(profit, price - minPrice);
    }

    return profit;
}

console.log(maxProfit([7, 1, 5, 3, 6, 4]))
console.log(maxProfit2([7, 1, 5, 3, 6, 4]))