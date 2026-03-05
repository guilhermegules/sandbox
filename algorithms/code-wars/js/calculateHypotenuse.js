function calculateHypotenuse(a, b) {
  if (typeof a !== "number" || typeof b !== "number") throw new Error("A and B should be number.");
  if (Number.isNaN(a) || Number.isNaN(b)) throw new Error("A and B should be number.");
  if (a <= 0 || b <= 0) throw new Error("A and B should be bigger or equal than zero.");
  const hypotenuse = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2)).toFixed(3);
  return Number(hypotenuse);
}
