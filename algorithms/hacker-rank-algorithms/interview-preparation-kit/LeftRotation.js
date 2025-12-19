/*
https://www.hackerrank.com/challenges/ctci-array-left-rotation/problem?isFullScreen=true&h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=arrays
*/

function rotLeft(a, d) {
    let j = 0;
    let firstElement = null;
  
    for(let i = 0; i < d; i++){ 
        firstElement = a[0];
        
        a.forEach((number, index) => {
            a[index] = a[index + 1];         
        })
 
        a[a.length - 1] = firstElement;  
    }  
    
    return a;
}
