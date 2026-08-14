function birthday(s: number[], d: number, m: number): number {
    if (s.length < m) return 0;
    
    let divided = 0;
    let sum = 0;
    
    for (let j = 0; j < m; j++) {
        sum += s[j];
    }
    
    if (sum === d) divided++;
    
    for (let i = m; i < s.length; i++) {
        sum += s[i];
        sum -= s[i - m];
        if (sum === d) divided++;
    }    
    
    return divided;
}
