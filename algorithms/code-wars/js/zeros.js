function zeros(n) {
  function trailingZeros(number) {
    if (number < 5) return 0;
    const trailingNumber = Math.floor(number / 5)
    return trailingNumber + trailingZeros(trailingNumber);
  }
  
  return trailingZeros(n);
}
