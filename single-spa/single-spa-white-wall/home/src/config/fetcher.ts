export const fetcher = (url: string, args?: RequestInit) =>
  fetch(url, args).then((res) => res.json());
