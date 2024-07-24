class AddNoteForm extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <form action="" id="notes-form">
        <div class="form-group">
            <label for="judul">Judul</label>
            <input type="text" name="judul" id="judul" autocomplete="off" />
        </div>
        <ul class="error-message error-message-judul"></ul>

        <div class="form-group">
            <label for="isi">Isi</label>
            <textarea rows="5" name="isi" id="isi"></textarea>
        </div>
        <ul class="error-message error-message-isi"></ul>

        <div class="flex-end mt-16">
            <button id="btn-tambah-catatan" class="btn-primary poppins-medium">
                <i class="fa-regular fa-plus"></i> Tambah
            </button>
        </div>
    </form>
    `;
  }
}

customElements.define("add-note-form", AddNoteForm);
