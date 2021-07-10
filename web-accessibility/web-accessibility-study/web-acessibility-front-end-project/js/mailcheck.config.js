const emailInput = document.querySelector("#email");
const suggestionMessage = document.querySelector("#suggestion");

const domains = ["gmail.com", "aol.com", "outlook.com", "yahoo.com"];
const secondLevelDomains = ["hotmail"];
const topLevelDomains = ["com", "net", "org", "br"];

emailInput.addEventListener("blur", () => {
  Mailcheck.run({
    email: yourTextInput.value,
    domains: domains,
    topLevelDomains: topLevelDomains,
    secondLevelDomains: secondLevelDomains,
    distanceFunction: superStringDistance,
    suggested: function (suggestion) {
      suggestionMessage.style.display = "inline-block";
      suggestionMessage.textContent = `Você quis dizer: ${suggestion.full} ?`;
      suggestionMessage.parentNode.classList.add("contatoCampo-msg--erro");

      emailInput.classList.add("contatoCampo--validouErro");

      suggestionMessage.setAttribute("tabindex", "0");
      suggestionMessage.setAttribute("role", "alert");
    },
  });
});
