function countApplesAndOranges(startingPoint: number, endingPoint: number, appleTreeLocation: number, orangeTreeLocation: number, apples: number[], oranges: number[]): void {
    let numberAppleLanded = 0
    let numberOrangeLanded = 0

    apples.forEach(apple => {
        const appleLanded = appleTreeLocation + apple
         if(appleLanded >= startingPoint && appleLanded <= endingPoint) {
            numberAppleLanded += 1
        }
    })
    
    oranges.forEach(orange => {
        const orangeLanded = orangeTreeLocation + orange
        if(orangeLanded >= startingPoint && orangeLanded <= endingPoint) {
            numberOrangeLanded += 1
        }
    })
    
    console.log(numberAppleLanded)
    console.log(numberOrangeLanded)
}
