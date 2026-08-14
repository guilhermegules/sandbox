function domainName(url){
  if (url.includes("//")) {
    const [, restUrl] = url.split("//")
    const splittedByDotUrl = restUrl.split(".")
    if (splittedByDotUrl[0] !== "www") {
      return splittedByDotUrl[0]
    }

    return splittedByDotUrl[1]
  }
  
  const splittedUrl = url.split(".")
  
  console.log(splittedUrl)

  const tlds = [
    ".com",
    ".org",
    ".net",
    ".info",
    ".biz",
    ".xyz",
    ".online",
    ".site",
    ".app",
    ".dev",
    ".tech",
    ".store",
    ".blog",
    ".cloud",
    ".br",
    ".pt",
    ".us",
    ".uk",
    ".de",
    ".fr",
    ".es",
    ".it",
    ".jp",
    ".ca",
    ".com.br",
    ".org.br",
    ".net.br",
    ".gov.br",
    ".edu.br",
    ".edu",
    ".gov",
    ".mil",
    ".int",
    ".design",
    ".marketing",
    ".law",
    ".med",
    ".music",
    ".art",
    ".photo",
    ".ai",
    ".io",
    ".games",
    ".co",
    ".za"
  ];

  
  if(splittedUrl.length === 2 || tlds.some(d => url.includes(d))) {
    return splittedUrl[0]
  }
  
  return splittedUrl[1]
}
