// https://www.hackerrank.com/challenges/ctci-ransom-note/problem?isFullScreen=true&h_l=interview&playlist_slugs%5B%5D=interview-preparation-kit&playlist_slugs%5B%5D=dictionaries-hashmaps
function checkMagazine(magazine: string[], note: string[]): void {
    const yesOrNo = note.reduce((hasNotes, n) => {
        const noteIndex = magazine.findIndex(m => m === n);
        magazine.splice(noteIndex, 1);
        return [...hasNotes, noteIndex >= 0];
    }, new Array<boolean>())
    .every(value => value);
    
    console.log(yesOrNo ? "Yes" : "No");
}
