const sales = [2, 3, 1, 2, 4, 3];
const target = 7;

function salesTarget(sales, target) {
  let left = 0, currentSum = 0, minLength = Infinity;    

  for (let right = 0; right < sales.length; right++) {
    currentSum += sales[right];

    while (currentSum >= target) {
        minLength = Math.min(minLength, right - left + 1)
        currentSum -= sales[left];
        left++;
    }    
  }

  return minLength === Infinity ? 0 : minLength;
}

console.log(salesTarget(sales, target))