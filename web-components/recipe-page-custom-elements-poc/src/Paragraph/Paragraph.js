export class Paragraph extends HTMLParagraphElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });

    const paragraph = document.createElement("p");
    paragraph.setAttribute("class", "paragraph");

    const text = this.getAttribute("text");
    paragraph.innerText = text;

    const style = document.createElement("style");
    style.textContent = `
      .paragraph {
        font-size: 16px;
      }
    `;
    shadow.appendChild(style);
    shadow.appendChild(paragraph);
  }
}

customElements.define("app-paragraph", Paragraph, { extends: "p" });
