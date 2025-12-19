export function toCamelCase(str:string):string{
  if(!str) return "";
  
  const words = str.split(/_|-/);
  
  return words.map((w, i) => i === 0 ? w : `${w[0].toUpperCase()}${w.slice(1)}`).join("");
}
