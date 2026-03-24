const distances = [60, 15, 20, 45, 30, 5, 12, 18, 55, 20];
const minDistance = 10;
const maxDistance = 50;

function findMaxSafeInterval(distances, min, max) {
    let left = 0;
    let maxDuration = 0;
    
    for (let right = 0; right < distances.length; right++) {
        const currentInterval = distances[right];

        if (currentInterval < min || currentInterval > max) {
            left = right + 1;
        } else {
            let currentDuration = right - left + 1;
            maxDuration = Math.max(maxDuration, currentDuration);
        }
    }

    return maxDuration;
}

console.log(findMaxSafeInterval(distances, minDistance, maxDistance));