export default class UserCard extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `<p>
      <b>Name:</b> <slot name="username"></slot>
    </p>`;
    this.shadowRoot.firstElementChild.onclick = (e) =>
      alert(`Inner target: ${e.target.tagName}`);
  }
}

customElements.define("user-card", UserCard);
