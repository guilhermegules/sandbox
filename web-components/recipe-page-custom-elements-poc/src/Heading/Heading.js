export default class Heading extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    const variant = this.getAttribute("variant");
    const text = this.getAttribute("text");

    shadow.innerHTML = `<${variant} style="color: ${this.getColor(
      variant
    )}">${text}</${variant}>`;
  }

  getColor(variant) {
    if (variant === "h1") return "var(--black)";

    if (variant === "h3") return "var(--primary-dark-raspberry)";

    return "var(--primary-nutmeg)";
  }
}

customElements.define("app-heading", Heading);
