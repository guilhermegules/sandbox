function minimumBribes(q: number[]): void {
    const TOO_CHAOTIC = "Too chaotic";
    const MAX_BRIBES = 3;
    const HOW_MANY_POSITIONS_BACK = 2;
    let steps = 0;
    let chaotic = false;
    
    
    for(let currentIndex = q.length - 1; currentIndex >= 0; currentIndex--) {
        if(q[currentIndex] - currentIndex > MAX_BRIBES) {
            chaotic = true;
        }
        
        for(let compareIndex = q[currentIndex] - HOW_MANY_POSITIONS_BACK; compareIndex < currentIndex; compareIndex++) {
            if(q[compareIndex] > q[currentIndex]) {
                steps++;
            }
        }
    }
    
    if(chaotic) {
        console.log(TOO_CHAOTIC);
    } else {
        console.log(steps);                
    }    
}
