function luckBalance(k: number, contests: number[][]): number {
    const unimportantContest = 0;
    const importantContests: number[] = [];
    let maxLuckBalance = 0;

    contests.forEach(([luck, importance]) => {
        if(importance === unimportantContest) {
            maxLuckBalance += luck;
            return;
        } 

        importantContests.push(luck);
    });

    importantContests.sort((a, b) => b - a);
    
    importantContests.forEach((importance, index) => {
        if(index < k) {
            maxLuckBalance += importance;
            return;
        }
        
        maxLuckBalance -= importance;
    });
    
    return maxLuckBalance;
}
