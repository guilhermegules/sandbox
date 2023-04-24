function sum(a, b, c) {
  return a + b + c;
}

function sum2(a) {
  return (b) => {
    return (c) => {
      return a + b + c;
    };
  };
}

console.log(sum(1, 2, 3));
console.log(sum2(1)(2)(3));
