const deliveryCosts = [4, 2, 1, 7, 8, 1, 2];
const budget = 14;

function slidingWindow(costs, budget) {
    let left = 0;
    let currentSum = 0;
    let maxCount = 0;

    for (let right = 0; right < costs.length; right++) {
        currentSum += costs[right];      
        
        while(currentSum > budget) {
            currentSum -= costs[left];
            left++;
        }

        let currentWindowSize = right - left + 1;
        maxCount = Math.max(maxCount, currentWindowSize);
    }

    return maxCount;
}

console.log(slidingWindow(deliveryCosts, budget))