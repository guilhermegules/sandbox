export default class Heading extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const variant = this.getAttribute("variant");
    const text = this.getAttribute("text");
    this.shadowRoot.innerHTML = `<${variant}>${text}</${variant}>`;
  }
}

customElements.define("app-heading", Heading);
