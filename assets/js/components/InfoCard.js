class InfoCard extends HTMLElement {
  static observedAttributes = ['number-id', 'title', 'icon'];
  constructor() {
    super();

    this._numberID = this.getAttribute('number-id');
    this._title = this.getAttribute('title');
    this._icon = this.getAttribute('icon');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
  }

  render() {
    this.innerHTML = `
        <div class="sub-item">
            <div class="sub-item-left">
                <span class="poppins-medium">${this._title}</span>
                <span class="poppins-semibold" id="${this._numberID}">0</span>
            </div>
            <i class="fa-regular ${this._icon} fa-2x"></i>
        </div>
    `;
  }
}

customElements.define('info-card', InfoCard);
