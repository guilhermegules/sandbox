export default class CustomMenu extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.append(
      document.getElementById("menu-template").content.cloneNode(true)
    );

    this.shadowRoot
      .querySelector('slot[name="title"]')
      .addEventListener("click", () => {
        this.shadowRoot.querySelector(".menu").classList.toggle("closed");
      });
  }
}

customElements.define("custom-menu", CustomMenu);
