function miniMaxSum(arr: number[]): void {
    let minSum = 0;
    let maxSum = 0;
    let minValue = Math.min(...arr);
    let maxValue = Math.max(...arr);

    arr.forEach((number) => {
        minSum += number;
        maxSum += number;
    });
    
    minSum -= maxValue;
    maxSum -= minValue;
    
    console.log(minSum, maxSum);
}
