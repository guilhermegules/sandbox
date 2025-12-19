function alternatingCharacters(s: string): number {
    const characters = s.split("");
    let deletionNumber = 0;
    
    for(let i = 0; i < characters.length; i++) {
        if(characters[i] === characters[i + 1]) {
            deletionNumber++;
        }
    }
    
    return deletionNumber;
}
