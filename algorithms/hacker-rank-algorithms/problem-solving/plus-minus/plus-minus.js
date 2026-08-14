function plusMinus(arr) {
    let positives = 0;
    let negatives = 0;
    let zeros = 0;
    let length = arr.length;
    
    for(let i = 0; i < length; i++) {
        if(arr[i] > 0) {
            positives++;
        } else if(arr[i] < 0) {
            negatives++;
        } else {
            zeros++;
        }
    }
    
    console.log(ratioCalculation(positives, length))
    console.log(ratioCalculation(negatives, length))
    console.log(ratioCalculation(zeros, length))
}

function ratioCalculation(ratio, quantity) {
    return ratio / quantity;
}
