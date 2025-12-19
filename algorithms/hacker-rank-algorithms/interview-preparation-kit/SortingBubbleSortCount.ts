// https://www.hackerrank.com/challenges/ctci-bubble-sort/problem?isFullScreen=true&h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=sorting
function countSwaps(a: number[]): void {
    let swaps = 0;
    
    for(let i = 0; i < a.length; i++) {
        for(let j = 0; j < a.length - 1; j++) {
            if(a[j] > a[j + 1]) {
                swaps++;
                const temp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = temp;
            }
        }
    }
    
    console.log(`Array is sorted in ${swaps} swaps.`);
    console.log(`First Element: ${a[0]}`);
    console.log(`Last Element: ${a[a.length - 1]}`);
}
