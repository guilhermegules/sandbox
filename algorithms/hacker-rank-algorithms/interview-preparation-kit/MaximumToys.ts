// https://www.hackerrank.com/challenges/mark-and-toys/problem?isFullScreen=true&h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=sorting
function maximumToys(prices: number[], k: number): number {
    let maxToys = 0;
    
    prices
        .sort((a, b) => a - b)
        .forEach(price => {
            if(k > price) {
                k -= price;
                maxToys++;
            } 
    });
    
    return maxToys;
}
