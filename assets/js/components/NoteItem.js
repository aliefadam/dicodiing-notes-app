class NoteItem extends HTMLElement {
  static observedAttributes = ["id", "title", "body", "timestamps", "archived"];

  constructor() {
    super();

    this._id = this.getAttribute("id");
    this._title = this.getAttribute("title");
    this._body = this.getAttribute("body");
    this._timestamps = this.getAttribute("timestamps");
    this._archived = this.getAttribute("archived");
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    this[`_${name}`] = newValue;
  }

  render() {
    this.innerHTML = `
    <div class="catatan-item">
        <h3>${this._title}</h3>
        <p>${this._body
          .toString()
          .replace("\n", "<br>")
          .split("", 50)
          .join("")}...</p>
        <div class="action">
        <button class="action-note btn-detail">
            <i class="fa-regular fa-eye"></i> Detail
        </button>
        <button class="action-note btn-arsip">
            <i class="fa-regular fa-box-archive"></i> Arsipkan
        </button>
        <button class="action-note btn-hapus">
            <i class="fa-regular fa-trash"></i> Hapus
        </button>
        </div>
    </div>
    `;
  }
}

customElements.define("note-item", NoteItem);
