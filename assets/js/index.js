import './../css/style.css';
import './components/SplashScreen.js';
import './components/NoteItem.js';
import './components/InfoCard.js';
import './components/AddNoteForm.js';
import './components/MyFooter.js';
import 'animate.css';
import Utils from './utils.js';

const inputJudul = document.querySelector('input#judul');
const inputIsi = document.querySelector('textarea#isi');
const notesForm = document.getElementById('notes-form');
const tabCatatan = document.getElementById('tab-catatan');
const tabDiarsipkan = document.getElementById('tab-diarsipkan');
const btnHideModal = document.getElementById('btn-hide-modal');

const showError = (name, value) => {
  const errorMessage = document.querySelector(`.error-message-${name}`);
  errorMessage.innerHTML = '';
  document.querySelector(`[name=${name}]`).style.border = '2px solid #2a243831';
  const listErrorMessage = [];

  if (value.length == 0) {
    const liElement = Utils.createElement({
      tag: 'li',
      content: 'Tidak Boleh Kosong',
    });
    errorMessage.append(liElement);
    document.querySelector(`[name=${name}]`).style.border = '2px solid #dc3545';
    listErrorMessage.push(`${name} Tidak Boleh Kosong`);
  }

  if (value.length < 3) {
    const liElement = Utils.createElement({
      tag: 'li',
      content: 'Minimal 3 Karakter',
    });
    errorMessage.append(liElement);
    document.querySelector(`[name=${name}]`).style.border = '2px solid #dc3545';
    listErrorMessage.push(`${name} Minimal 3 Karakter`);
  }

  errorMessage.style.display = 'block';
  return listErrorMessage;
};

function checkValidation() {
  const value = this.value;
  const name = this.getAttribute('name');
  showError(name, value);
}

const handleSubmit = (e) => {
  e.preventDefault();
  const listInput = e.target.querySelectorAll('input, textarea');
  const listError = [];
  listInput.forEach((el) => {
    const message = showError(el.name, el.value);
    listError.push(message);
  });

  if (listError.flat().length > 0) {
    const errorMessage =
      listError.flat()[0].toString().charAt(0).toUpperCase() +
      listError.flat()[0].toString().slice(1);
    Utils.showNotification({
      title: 'Gagal',
      text: errorMessage,
      icon: 'error',
    });
    return;
  }

  saveData({
    title: listInput[0].value,
    body: listInput[1].value,
  });
};

const requestAPI = async (endpointPath, options = {}) => {
  const endpoint = 'https://notes-api.dicoding.dev/v2';
  const fullURL = `${endpoint}/${endpointPath}`;

  return fetch(fullURL, options)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => console.log(err))
    .finally(() => console.log('request sukses'));
};

const getCountData = async () => {
  const response = await requestAPI('/notes');
  const responseArchived = await requestAPI('/notes/archived');

  const catatanDiarsipkan = responseArchived.data.length;
  const totalData = response.data.length + catatanDiarsipkan;

  document.getElementById('total-catatan').innerHTML = totalData;
  document.getElementById('catatan-diarsipkan').innerHTML = catatanDiarsipkan;
};

const showData = async ({ isArchived = false } = {}) => {
  const tabCatatan = document.getElementById('tab-catatan');
  const tabDiarsipkan = document.getElementById('tab-diarsipkan');

  if (isArchived) {
    tabCatatan.classList.remove('active-tab');
    tabDiarsipkan.classList.add('active-tab');
  } else {
    tabCatatan.classList.add('active-tab');
    tabDiarsipkan.classList.remove('active-tab');
  }

  const response = await requestAPI(`/notes${isArchived ? '/archived' : ''}`);
  const notes = response.data;

  document.getElementById('container-catatan').innerHTML = '';
  notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  notes
    .filter((note) => note.archived == isArchived)
    .forEach((note) => {
      const noteItem = document.createElement('note-item');
      noteItem.setAttribute('id', note.id);
      noteItem.setAttribute('title', note.title);
      noteItem.setAttribute('body', note.body);
      noteItem.setAttribute('created_at', note.createdAt);
      noteItem.setAttribute('archived', note.archived);
      document.getElementById('container-catatan').append(noteItem);
    });

  getCountData();
};

const saveData = async ({ title, body }) => {
  const response = await requestAPI('/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: title,
      body: body,
    }),
  });

  if (response.status == 'fail') {
    Utils.showNotification({
      title: 'Error',
      text: response.message,
      icon: 'error',
    });
    return;
  }

  Utils.showNotification({
    title: 'Sukses',
    text: 'Berhasil Menambah Catatan',
    icon: 'success',
  });

  showData();
  clearForm();
};

const deleteData = ({ target }) => {
  if (
    target.classList.contains('btn-hapus') ||
    target.classList.contains('icon-hapus')
  ) {
    const id = target.getAttribute('data-id');
    console.log({ id });

    const activeTab = document.querySelector('.active-tab');
    const isArchived = activeTab.getAttribute('data-archive') == 'true';

    Utils.showConfirmationDelete().then(async (result) => {
      if (result.isConfirmed) {
        const response = await requestAPI(`/notes/${id}`, {
          method: 'DELETE',
        });

        if (response.status == 'fail') {
          Utils.showNotification({
            title: 'Error',
            text: response.message,
            icon: 'error',
          });
          return;
        }

        showData({ isArchived: isArchived });
        Utils.showNotification({
          text: 'Data Dihapus',
          icon: 'success',
          title: 'Berhasil',
        });
      }
    });
  }
};

const archiveData = async ({ target }) => {
  if (
    target.classList.contains('btn-arsip') ||
    target.classList.contains('icon-arsip')
  ) {
    const id = target.getAttribute('data-id');
    const response = await requestAPI(`/notes/${id}/archive`, {
      method: 'POST',
    });

    if (response.status == 'fail') {
      Utils.showNotification({
        title: 'Error',
        text: response.message,
        icon: 'error',
      });
      return;
    }

    showData({ isArchived: false });
  }
};

const unArchiveData = async ({ target }) => {
  if (
    target.classList.contains('btn-keluarkan-arsip') ||
    target.classList.contains('icon-keluarkan-arsip')
  ) {
    const id = target.getAttribute('data-id');
    const response = await requestAPI(`/notes/${id}/unarchive`, {
      method: 'POST',
    });

    if (response.status == 'fail') {
      Utils.showNotification({
        title: 'Error',
        text: response.message,
        icon: 'error',
      });
      return;
    }

    showData({ isArchived: true });
  }
};

const showDetail = async ({ target }) => {
  if (
    target.classList.contains('btn-detail') ||
    target.classList.contains('icon-detail')
  ) {
    const id = target.getAttribute('data-id');

    const response = await requestAPI(`/notes/${id}`);
    if (response.status == 'fail') {
      Utils.showNotification({
        title: 'Error',
        text: response.message,
        icon: 'error',
      });
      return;
    }

    const note = response.data;
    const { title, body } = note;
    document.getElementById('detail-title').innerHTML = title;
    document.getElementById('detail-body').innerHTML = Utils.addEllipsis(body);

    const modalDetail = document.getElementById('modal-detail');
    const modalContainer = document.getElementById('modal-container');
    modalContainer.classList.remove('animate__fadeOutUp');
    modalContainer.classList.add('animate__fadeInDown');
    modalDetail.style.display = 'flex';
  }
};

const closeModal = () => {
  const modalContainer = document.getElementById('modal-container');
  modalContainer.classList.remove('animate__fadeInDown');
  modalContainer.classList.add('animate__fadeOutUp');
  setTimeout(() => {
    document.getElementById('modal-detail').style.display = 'none';
  }, 600);
};

const clearForm = () => {
  notesForm.querySelectorAll('input, textarea').forEach((el) => {
    el.value = '';
  });
};

// Pemanggilan DOM
window.addEventListener('load', function () {
  const loadingScreen = document.getElementById('loading');
  const mainContent = document.getElementById('main-content');
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'block';
  }, 1500);
});
inputJudul.addEventListener('input', checkValidation);
inputIsi.addEventListener('input', checkValidation);
notesForm.addEventListener('submit', (e) => handleSubmit(e));
document.addEventListener('click', deleteData);
document.addEventListener('click', archiveData);
document.addEventListener('click', unArchiveData);
document.addEventListener('click', showDetail);
document.addEventListener('click', ({ target }) => {
  if (!target.closest('.modal-container')) {
    if (
      !target.classList.contains('btn-detail') &&
      !target.classList.contains('icon-detail')
    ) {
      closeModal();
    }
  }
});
btnHideModal.addEventListener('click', closeModal);
tabCatatan.addEventListener('click', () => showData({ isArchived: false }));
tabDiarsipkan.addEventListener('click', () => showData({ isArchived: true }));

showData();
