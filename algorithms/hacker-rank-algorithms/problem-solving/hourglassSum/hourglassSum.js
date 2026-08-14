/*
https://www.hackerrank.com/challenges/2d-array/problem?isFullScreen=true&h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays
*/
function hourglassSum(arr) {
    let max = -100;
    const MAX_SIZE = 6;
    
    for(let i = 0; i < MAX_SIZE; i++) {
        for(let j = 0; j < MAX_SIZE; j++) {
            if(i + 2 < MAX_SIZE && j + 2 < MAX_SIZE) {
              const sum = arr[i][j] + arr[i][j + 1] + arr[i][j + 2] + arr[i + 1][j + 1] + arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2];
              max = sum > max ? sum : max;         
            }
        }
    }
    
    return max;
}
