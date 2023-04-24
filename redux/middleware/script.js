const li = Array.from(document.querySelectorAll("li"));

const getElementAttr = (key) => (element) => element.getAttribute(key);

const getAttrDataSlide = getElementAttr("data-slide");
const getAttrIdSlide = getElementAttr("id");

const dataSlides = li.map(getAttrDataSlide);
const ids = li.map(getAttrIdSlide);

console.log(dataSlides);
console.log(ids);
