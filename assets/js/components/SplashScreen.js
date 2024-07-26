class SplashScreen extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <div id="loading">
            <i class="fa-regular fa-pen-to-square"></i>
            <h1 class="poppins-black">NOTES APP <span>|</span> ALIEF ADAM</h1>
            <div class="loader"></div>
        </div>
        `;
  }
}

customElements.define('splash-screen', SplashScreen);
