// Variáveis
const btnAbreDialog = document.querySelector("#abreDialog");
const dialog = document.querySelector(".dialogNewsletter");
const dialogBody = document.querySelector(".dialogNewsletter-body");
const dialogOverlay = document.querySelector(".dialogNewsletter-overlay");
const mainContent = document.querySelector("#main");

btnAbreDialog.style.display = "block";

// Quando abrir a dialog...
btnAbreDialog.addEventListener("click", function () {
  dialog.classList.add("dialogNewsletter--aberto");
  document.querySelector("#emailNewsLetter").focus();
  mainContent.inert = true;
});

function fechandoDialog() {
  document.activeElement.blur();
  dialog.classList.remove("dialogNewsletter--aberto");
  mainContent.inert = false;
  btnAbreDialog.focus();
}

// Listeners
document
  .querySelector(".dialogNewsletter-fechar")
  .addEventListener("click", fechandoDialog);
