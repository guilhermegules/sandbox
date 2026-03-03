const runnerTimes = [2, 4, 5, 8, 9, 10, 13];
const targetSum = 15;

function twoRunners(times, target) {
    let left = 0;
    let right = times.length - 1;

    while (left < right) {
        let currentSum = times[left] + times[right];

        if (currentSum === target) {
            return [times[left], times[right]];
        } else if (currentSum < target) {
            left++;
        } else {
            right--;
        }
    }

    return null;
}

console.log(twoRunners(runnerTimes, targetSum))