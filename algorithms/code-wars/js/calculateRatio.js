function calculateRatio(w, h){
  if (!w || !h) {
    throw new Error("Width or Height invalid.");
  }
  
  function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
  }
  
  const divisor = gcd(w, h);
  return `${w / divisor}:${h / divisor}`;
}
