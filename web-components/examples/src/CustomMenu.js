export default class CustomMenu extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<div class="menu">
      <slot name="title"></slot>
      <ul><slot name="item"></slot></ul>
    </div>`;
    this.shadowRoot.append(
      document.getElementById("menu-template").content.cloneNode(true)
    );

    // shadowRoot can't have event handlers, so using the first child
    this.shadowRoot.firstElementChild.addEventListener(
      "slotchange",
      (event) => {
        console.log(`slotchange: %c%s`, "color: #bada55;", event.target.name);
        const slot = event.target;
        if (slot.name === "item") {
          this.items = slot
            .assignedElements()
            .map((element) => element.textContent);
          alert(`Items: ${this.items}`);
        }
      }
    );

    this.shadowRoot
      .querySelector('slot[name="title"]')
      .addEventListener("click", () => {
        this.shadowRoot.querySelector(".menu").classList.toggle("closed");
      });

    setTimeout(() => {
      this.insertAdjacentHTML("beforeEnd", '<li slot="item">Lollipop</li>');
    }, 1000);

    setTimeout(() => {
      this.insertAdjacentHTML("beforeEnd", '<li slot="item">Cup Cake</li>');
    }, 2000);

    setTimeout(() => {
      this.querySelector('[slot="title"]').innerHTML = "New menu";
    }, 2000);
  }
}

customElements.define("custom-menu", CustomMenu);
