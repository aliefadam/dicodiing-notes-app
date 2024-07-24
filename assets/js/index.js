import "./components/NoteItem.js";
import "./components/InfoCard.js";
import "./components/AddNoteForm.js";
import Utils from "./utils.js";

const notesData = [
  {
    id: "notes-jT-jjsyz61J8XKiI",
    title: "Welcome to Notes, Dimas!",
    body: "Welcome to Notes! This is your first note. You can archive it, delete it, or create new ones.",
    createdAt: "2022-07-28T10:03:12.594Z",
    archived: false,
  },
  {
    id: "notes-aB-cdefg12345",
    title: "Meeting Agenda",
    body: "Discuss project updates and assign tasks for the upcoming week.",
    createdAt: "2022-08-05T15:30:00.000Z",
    archived: false,
  },
  {
    id: "notes-XyZ-789012345",
    title: "Shopping List",
    body: "Milk, eggs, bread, fruits, and vegetables.",
    createdAt: "2022-08-10T08:45:23.120Z",
    archived: false,
  },
  {
    id: "notes-1a-2b3c4d5e6f",
    title: "Personal Goals",
    body: "Read two books per month, exercise three times a week, learn a new language.",
    createdAt: "2022-08-15T18:12:55.789Z",
    archived: false,
  },
  {
    id: "notes-LMN-456789",
    title: "Recipe: Spaghetti Bolognese",
    body: "Ingredients: ground beef, tomatoes, onions, garlic, pasta. Steps:...",
    createdAt: "2022-08-20T12:30:40.200Z",
    archived: false,
  },
  {
    id: "notes-QwErTyUiOp",
    title: "Workout Routine",
    body: "Monday: Cardio, Tuesday: Upper body, Wednesday: Rest, Thursday: Lower body, Friday: Cardio.",
    createdAt: "2022-08-25T09:15:17.890Z",
    archived: false,
  },
  {
    id: "notes-abcdef-987654",
    title: "Book Recommendations",
    body: "1. 'The Alchemist' by Paulo Coelho\n2. '1984' by George Orwell\n3. 'To Kill a Mockingbird' by Harper Lee",
    createdAt: "2022-09-01T14:20:05.321Z",
    archived: false,
  },
  {
    id: "notes-zyxwv-54321",
    title: "Daily Reflections",
    body: "Write down three positive things that happened today and one thing to improve tomorrow.",
    createdAt: "2022-09-07T20:40:30.150Z",
    archived: false,
  },
  {
    id: "notes-poiuyt-987654",
    title: "Travel Bucket List",
    body: "1. Paris, France\n2. Kyoto, Japan\n3. Santorini, Greece\n4. New York City, USA",
    createdAt: "2022-09-15T11:55:44.678Z",
    archived: false,
  },
  {
    id: "notes-asdfgh-123456",
    title: "Coding Projects",
    body: "1. Build a personal website\n2. Create a mobile app\n3. Contribute to an open-source project",
    createdAt: "2022-09-20T17:10:12.987Z",
    archived: false,
  },
  {
    id: "notes-5678-abcd-efgh",
    title: "Project Deadline",
    body: "Complete project tasks by the deadline on October 1st.",
    createdAt: "2022-09-28T14:00:00.000Z",
    archived: false,
  },
  {
    id: "notes-9876-wxyz-1234",
    title: "Health Checkup",
    body: "Schedule a routine health checkup with the doctor.",
    createdAt: "2022-10-05T09:30:45.600Z",
    archived: false,
  },
  {
    id: "notes-qwerty-8765-4321",
    title: "Financial Goals",
    body: "1. Create a monthly budget\n2. Save 20% of income\n3. Invest in a retirement fund.",
    createdAt: "2022-10-12T12:15:30.890Z",
    archived: false,
  },
  {
    id: "notes-98765-54321-12345",
    title: "Holiday Plans",
    body: "Research and plan for the upcoming holiday destination.",
    createdAt: "2022-10-20T16:45:00.000Z",
    archived: false,
  },
  {
    id: "notes-1234-abcd-5678",
    title: "Language Learning",
    body: "Practice Spanish vocabulary for 30 minutes every day.",
    createdAt: "2022-10-28T08:00:20.120Z",
    archived: false,
  },
];

showData();

const inputJudul = document.querySelector("input#judul");
const inputIsi = document.querySelector("textarea#isi");
const notesForm = document.getElementById("notes-form");
const tabCatatan = document.getElementById("tab-catatan");
const tabDiarsipkan = document.getElementById("tab-diarsipkan");
const btnHideModal = document.getElementById("btn-hide-modal");

inputJudul.addEventListener("input", checkValidation);
inputIsi.addEventListener("input", checkValidation);
notesForm.addEventListener("submit", (e) => handleSubmit(e));
document.addEventListener("click", deleteData);
document.addEventListener("click", archiveData);
document.addEventListener("click", unArchiveData);
document.addEventListener("click", showDetail);
document.addEventListener("click", ({ target }) => {
  if (!target.closest(".modal-container")) {
    if (
      !target.classList.contains("btn-detail") &&
      !target.classList.contains("icon-detail")
    ) {
      closeModal();
    }
  }
});
btnHideModal.addEventListener("click", closeModal);
tabCatatan.addEventListener("click", () => showData({ isArchived: false }));
tabDiarsipkan.addEventListener("click", () => showData({ isArchived: true }));

function showError(name, value) {
  const errorMessage = document.querySelector(`.error-message-${name}`);
  errorMessage.innerHTML = "";
  document.querySelector(`[name=${name}]`).style.border = "2px solid #2a243831";
  const listErrorMessage = [];

  if (value.length == 0) {
    const liElement = Utils.createElement({
      tag: "li",
      content: "Tidak Boleh Kosong",
    });
    errorMessage.append(liElement);
    document.querySelector(`[name=${name}]`).style.border = "2px solid #dc3545";
    listErrorMessage.push(`${name} Tidak Boleh Kosong`);
  }

  if (value.length < 3) {
    const liElement = Utils.createElement({
      tag: "li",
      content: "Minimal 3 Karakter",
    });
    errorMessage.append(liElement);
    document.querySelector(`[name=${name}]`).style.border = "2px solid #dc3545";
    listErrorMessage.push(`${name} Minimal 3 Karakter`);
  }

  errorMessage.style.display = "block";
  return listErrorMessage;
}

function checkValidation() {
  const value = this.value;
  const name = this.getAttribute("name");
  showError(name, value);
}

function handleSubmit(e) {
  e.preventDefault();
  const listInput = e.target.querySelectorAll("input, textarea");
  const listError = [];
  listInput.forEach((el) => {
    const message = showError(el.name, el.value);
    listError.push(message);
  });

  if (listError.flat().length > 0) {
    console.log("masih di run");
    const errorMessage =
      listError.flat()[0].toString().charAt(0).toUpperCase() +
      listError.flat()[0].toString().slice(1);
    Utils.showNotification({
      title: "Gagal",
      text: errorMessage,
      icon: "error",
    });
    return;
  }

  saveData({
    title: listInput[0].value,
    body: listInput[1].value,
  });
}

function saveData({ title, body }) {
  const newNotes = {
    id: Utils.generateId(),
    title: title,
    body: body,
    createdAt: Utils.generateTimestamp(),
    archived: false,
  };

  Utils.showNotification({
    title: "Sukses",
    text: "Berhasil Menambah Catatan",
    icon: "success",
  });

  const notes = [...getLocalStorageItem("notesData"), newNotes];
  saveToLocalStorage("notesData", JSON.stringify(notes));

  showData();
  clearForm();
}

function showData({ isArchived = false } = {}) {
  const tabCatatan = document.getElementById("tab-catatan");
  const tabDiarsipkan = document.getElementById("tab-diarsipkan");

  if (isArchived) {
    tabCatatan.classList.remove("active-tab");
    tabDiarsipkan.classList.add("active-tab");
  } else {
    tabCatatan.classList.add("active-tab");
    tabDiarsipkan.classList.remove("active-tab");
  }

  document.getElementById("container-catatan").innerHTML = "";
  let notes = [];

  if (JSON.parse(localStorage.getItem("notesData"))) {
    notes = getLocalStorageItem("notesData");
  } else {
    saveToLocalStorage("notesData", JSON.stringify(notesData));
    notes = getLocalStorageItem("notesData");
  }

  notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  notes
    .filter((note) => note.archived == isArchived)
    .forEach((note) => {
      const noteItem = document.createElement("note-item");
      noteItem.setAttribute("id", note.id);
      noteItem.setAttribute("title", note.title);
      noteItem.setAttribute("body", note.body);
      noteItem.setAttribute("created_at", note.createdAt);
      noteItem.setAttribute("archived", note.archived);
      document.getElementById("container-catatan").append(noteItem);
    });

  const totalCatatan = notes.length;
  const catatanDiarsipkan = notes.filter((note) => note.archived).length;

  document.getElementById("total-catatan").innerHTML = totalCatatan;
  document.getElementById("catatan-diarsipkan").innerHTML = catatanDiarsipkan;
}

function deleteData({ target }) {
  if (
    target.classList.contains("btn-hapus") ||
    target.classList.contains("icon-hapus")
  ) {
    const id = target.getAttribute("data-id");
    let isArchived = false;
    Utils.showConfirmationDelete().then((result) => {
      if (result.isConfirmed) {
        getLocalStorageItem("notesData").forEach((note) => {
          if (note.id == id) {
            isArchived = note.archived;
          }
        });
        const updatedNotes = getLocalStorageItem("notesData").filter(
          (note) => note.id != id
        );
        console.log("diarsipkan:", isArchived);
        saveToLocalStorage("notesData", JSON.stringify(updatedNotes));
        showData({ isArchived: isArchived });
        Utils.showNotification({
          text: "Data Dihapus",
          icon: "success",
          title: "Berhasil",
        });
      }
    });
  }
}

function archiveData({ target }) {
  if (
    target.classList.contains("btn-arsip") ||
    target.classList.contains("icon-arsip")
  ) {
    const id = target.getAttribute("data-id");
    const notes = getLocalStorageItem("notesData").map((note) => {
      if (note.id == id) {
        note.archived = !note.archived;
      }
      return note;
    });
    saveToLocalStorage("notesData", JSON.stringify(notes));
    showData({ isArchived: false });
  }
}

function unArchiveData({ target }) {
  if (
    target.classList.contains("btn-keluarkan-arsip") ||
    target.classList.contains("icon-keluarkan-arsip")
  ) {
    const id = target.getAttribute("data-id");
    const notes = getLocalStorageItem("notesData").map((note) => {
      if (note.id == id) {
        note.archived = !note.archived;
      }
      return note;
    });
    saveToLocalStorage("notesData", JSON.stringify(notes));
    showData({ isArchived: true });
  }
}

function showDetail({ target }) {
  if (
    target.classList.contains("btn-detail") ||
    target.classList.contains("icon-detail")
  ) {
    const id = target.getAttribute("data-id");
    const modalDetail = document.getElementById("modal-detail");
    const note = getLocalStorageItem("notesData").find((note) => note.id == id);
    const { title, body } = note;
    document.getElementById("detail-title").innerHTML = title;
    document.getElementById("detail-body").innerHTML = Utils.addEllipsis(body);
    modalDetail.style.display = "flex";
  }
}

function closeModal() {
  document.getElementById("modal-detail").style.display = "none";
}

function saveToLocalStorage(key, value) {
  localStorage.setItem(key, value);
}

function getLocalStorageItem(key) {
  return JSON.parse(localStorage.getItem(key));
}

function clearForm() {
  notesForm.querySelectorAll("input, textarea").forEach((el) => {
    el.value = "";
  });
}
