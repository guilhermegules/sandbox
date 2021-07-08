const btns = document.querySelectorAll(".listaDeArtigos-slider-item");
const news = document.querySelectorAll(".listaDeArtigos-item");

const new0 = document.querySelector("#new0");
const new1 = document.querySelector("#new1");
const new2 = document.querySelector("#new2");

new0.style.display = "block";

const hideSpan = document.createElement("span");
hideSpan.classList.add("escondeVisualmente");
hideSpan.textContent = "(Slide atual)";

btns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    // This will prevent the screen will be displaced
    // btn.href = "javascript:void(0)";

    news.forEach((news) => {
      news.style.display = "none";

      if (
        this.getAttribute("data-sliderItem") === news.getAttribute("data-news")
      ) {
        news.style.display = "block";
      }
    });

    document
      .querySelector(".listaDeArtigos-slider-item .escondeVisualmente")
      .remove();

    this.append(hideSpan);

    btns.forEach(function (btnRemoveClass) {
      btnRemoveClass.classList.remove("listaDeArtigos-slider-item--ativo");
    });

    this.classList.add("listaDeArtigos-slider-item--ativo");
  });
});
