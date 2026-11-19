// Async utility module for testing dynamic import & code-splitting
export function computeHeavyFibonacci(n = 30) {
  const start = performance.now();
  function fib(num) {
    if (num <= 1) return num;
    return fib(num - 1) + fib(num - 2);
  }
  const result = fib(n);
  const duration = (performance.now() - start).toFixed(2);
  return { result, duration, n };
}

export function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
