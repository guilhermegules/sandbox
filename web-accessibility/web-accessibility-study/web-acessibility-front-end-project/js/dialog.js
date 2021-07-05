// Variáveis
const btnAbreDialog = document.querySelector("#abreDialog");
const dialog = document.querySelector(".dialogNewsletter");
const dialogBody = document.querySelector(".dialogNewsletter-body");
const dialogOverlay = document.querySelector(".dialogNewsletter-overlay");
const mainContent = document.querySelector("#main");
const video = document.querySelector("video");

btnAbreDialog.style.display = "block";

// Quando abrir a dialog...
btnAbreDialog.addEventListener("click", () => {
  dialog.classList.add("dialogNewsletter--aberto");
  document.querySelector("#emailNewsLetter").focus();
  mainContent.inert = true;
  video.removeAttribute("controls");
});

function fechandoDialog() {
  document.activeElement.blur();
  dialog.classList.remove("dialogNewsletter--aberto");
  mainContent.inert = false;
  btnAbreDialog.focus();
  video.setAttribute("controls", true);
}

// Listeners
document
  .querySelector(".dialogNewsletter-fechar")
  .addEventListener("click", fechandoDialog);

dialogOverlay.addEventListener("click", fechandoDialog);

document.addEventListener("keyup", (event) => {
  if (event.key === 27) {
    fechandoDialog();
  }
});
