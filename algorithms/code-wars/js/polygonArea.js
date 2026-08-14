function polygonArea(A,B,C,D){
  const outerRectangle = B * C;
  const cutoutRectangle =  (C - A) * (B - D);
  const area = outerRectangle - cutoutRectangle
  
  return area;
}
