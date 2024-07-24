import Utils from "../utils.js";

class NoteItem extends HTMLElement {
  static observedAttributes = ["id", "title", "body", "created_at", "archived"];

  constructor() {
    super();

    this._id = this.getAttribute("id");
    this._title = this.getAttribute("title");
    this._body = this.getAttribute("body");
    this._created_at = this.getAttribute("created_at");
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
    <div class="catatan-item" data-archived="${this._archived}">
        <span class="created-at">
          ${Utils.formatDate(this._created_at)}
        </span>
        <h3>
          ${Utils.addEllipsis(this._title, 25)}
        </h3>
        <p>
          ${Utils.addEllipsis(this._body, 50)}
        </p>
        <div class="action">
        <button class="action-note btn-detail" data-id="${
          this._id
        }" data-created_at="${this._created_at}">
            <i class="fa-regular fa-eye icon-detail" data-id="${
              this._id
            }"></i> Detail
        </button>
        <button class="action-note ${
          this._archived == "true" ? "btn-keluarkan-arsip" : "btn-arsip"
        }" data-id="${this._id}" data-created_at="${this._created_at}">
            ${
              this._archived == "true"
                ? `<i class="fa-solid fa-inbox-out icon-keluarkan-arsip" data-id="${this._id}"></i>`
                : `<i class="fa-regular fa-box-archive icon-arsip" data-id="${this._id}"></i>`
            } ${this._archived == "true" ? "Keluarkan" : "Arsipkan"}
        </button>
        <button class="action-note btn-hapus" data-id="${
          this._id
        }" data-created_at="${this._created_at}">
            <i class="fa-regular fa-trash icon-hapus" data-id="${
              this._id
            }"></i> Hapus
        </button>
        </div>
    </div>
    `;
  }
}

customElements.define("note-item", NoteItem);
