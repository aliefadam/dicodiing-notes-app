class MyFooter extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
        <<footer>
            <p class="poppins-medium">
                Copyright &copy; 2022 - <span class="">Notes App | By Alief Adam</span>
            </p>
        </footer>
    `;
  }
}

customElements.define("my-footer", MyFooter);
