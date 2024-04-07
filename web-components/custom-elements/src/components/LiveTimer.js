export default class LiveTimer extends HTMLElement {
  render() {
    this.innerHTML = `<time-formatted hour="numeric" minute="numeric" second="numeric"></time-formatted>`;
    this.timerElement = this.firstElementChild;
  }

  connectedCallback() {
    if (!this.rendered) {
      this.render();
      this.rendered = true;
    }
    this.timer = setInterval(() => this.update(), 1000);
  }

  update() {
    this.date = new Date();
    this.timerElement.setAttribute("datetime", this.date);
    this.dispatchEvent(new CustomEvent("tick", { detail: this.date }));
  }

  disconnectedCallback() {
    clearInterval(this.timer);
  }
}

customElements.define("live-timer", LiveTimer);
