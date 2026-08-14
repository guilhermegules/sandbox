// https://www.hackerrank.com/challenges/breaking-best-and-worst-records/problem
function breakingRecords(scores: number[]): number[] {
    let maxValue = scores[0];
    let minValue = scores[0];
    
    const score = scores.reduce((acc, value) => {
        if(value > maxValue) {
            maxValue = value;
            return { ...acc, max: acc.max + 1 }
        }
        
        if(value < minValue) {
            minValue = value;
            return { ...acc, min: acc.min + 1 };
        }
        
        return acc
    }, {
        max: 0,
        min: 0,
    });
    
    return [score.max, score.min];    
}
