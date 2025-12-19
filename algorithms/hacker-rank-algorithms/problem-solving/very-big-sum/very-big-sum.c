long aVeryBigSum(int arrayLength, long* numbers) {
    long accumulator = 0;
    
    for(int i = 0; i < arrayLength; i++) {
        accumulator += numbers[i];
    }
    
    return accumulator;
}