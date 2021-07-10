const cepInput = document.querySelector("#cep");

cepInput.oninvalid = function () {
  this.setCustomValidity("");

  if (!this.validity.valid) {
    this.setCustomValidity("Ops! tem algo errado neste campo!");
    this.parentNode.classList.add("contatoCampo-msg--erro");
  }
};
