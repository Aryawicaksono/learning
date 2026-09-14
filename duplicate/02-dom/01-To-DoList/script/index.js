'use strict';

/**
 * ==========================================
 * 1. SELEKSI ELEMEN DOM & INISIALISASI STATE
 * ==========================================
 */

/** Elemen penampung angka statistik task */
const taskCount = document.getElementById('taskCount');
const activeCount = document.getElementById('activeCount');
const completedCount = document.getElementById('completedCount');

/** Elemen form input dan tombol penambah task */
const taskInput = document.getElementById('taskInput');
const submitBtn = document.getElementById('submitBtn');

/** Elemen segmented control (tab filter) */
const taskSegment = document.getElementById('taskSegment');
const activeSegment = document.getElementById('activeSegment');
const completedSegment = document.getElementById('completedSegment');

/** Elemen kontainer utama dan tampilan state kosong (empty state) */
const contentArea = document.querySelector('.content__content');
const emptyState = document.querySelector('.content__content-inner');

/** Element `<ul>` yang dibuat secara dinamis untuk menampung daftar elemen `<li>` */
const ul = document.createElement('ul');
ul.className = 'task__list';

/**
 * Array utama penyimpan data task (Single Source of Truth)
 * @type {Array<{id: number, text: string, isDone: boolean}>}
 */
let tasks = [];

/** Menyimpan nilai string terkini dari kolom input yang sudah di-trim */
let currentValue = '';

/** Auto-increment ID untuk setiap task baru */
let nextId = 1;

/** Filter status yang sedang aktif ('all' | 'active' | 'complete') */
let currentFilter = 'all';

/**
 * ==========================================
 * 2. HELPER & UI RENDER FUNCTIONS
 * ==========================================
 */

/**
 * Menghitung jumlah task berdasarkan statusnya (All, Active, Done)
 * dan memperbarui angka tampilan pada UI header.
 */
function updateCount() {
  const activeTasks = tasks.filter(t => !t.isDone);
  const completedTasks = tasks.filter(t => t.isDone);

  taskCount.textContent = tasks.length;
  activeCount.textContent = activeTasks.length;
  completedCount.textContent = completedTasks.length;
}

/**
 * Mengelola tampilan visual pada tab segmented control.
 * Menambahkan class `--enabled` untuk tab aktif dan `--disabled` untuk tab non-aktif.
 */
function renderSegments() {
  taskSegment.classList.toggle('content__segment--enabled', currentFilter === 'all');
  taskSegment.classList.toggle('content__segment--disabled', currentFilter !== 'all');

  activeSegment.classList.toggle('content__segment--enabled', currentFilter === 'active');
  activeSegment.classList.toggle('content__segment--disabled', currentFilter !== 'active');

  completedSegment.classList.toggle('content__segment--enabled', currentFilter === 'complete');
  completedSegment.classList.toggle('content__segment--disabled', currentFilter !== 'complete');
}

/**
 * Mengosongkan nilai input, menghapus atribut penanda,
 * serta mengembalikan tombol submit ke status dinonaktifkan (disabled).
 */
function resetInput() {
  currentValue = '';
  taskInput.value = '';
  taskInput.removeAttribute('value');
  submitBtn.classList.remove('btn--enabled');
  submitBtn.classList.add('btn--disabled');
  submitBtn.disabled = true;
}

/**
 * Mengatur kelas CSS pada elemen checkbox dan teks deskripsi berdasarkan status `task.isDone`.
 * @param {Object} task - Objek data task yang sedang diproses.
 * @param {HTMLElement} container - Elemen `<li>` tempat task dirender.
 */
function renderCheckBtnUI(task, container) {
  const checkBox = container.querySelector('.check-btn');
  const taskDesc = container.querySelector('.task__task-desc');

  if (task.isDone) {
    checkBox.classList.add('check-btn--checked');
    checkBox.classList.remove('check-btn--unchecked');
    taskDesc.classList.add('task__task-desc--done');
  } else {
    checkBox.classList.add('check-btn--unchecked');
    checkBox.classList.remove('check-btn--checked');
    taskDesc.classList.remove('task__task-desc--done');
  }
}

/**
 * Menempelkan event listener pada tombol aksi (Check, Edit, Delete) di setiap item task.
 * @param {Object} task - Objek data task target.
 * @param {HTMLElement} container - Elemen `<li>` tempat event listener dipasang.
 */
function bindTaskEvents(task, container) {
  // A. Event Toggle Status Selesai (Check/Uncheck)
  container.querySelector('.check-btn').addEventListener('click', () => {
    task.isDone = !task.isDone;
    renderTasks();
  });

  // B. Event Edit Task (Memindahkan teks ke input untuk diperbarui)
  container.querySelector('.btn-edit').addEventListener('click', () => {
    taskInput.value = task.text;
    currentValue = task.text;
    taskInput.setAttribute('value', task.text);

    submitBtn.classList.remove('btn--disabled');
    submitBtn.classList.add('btn--enabled');
    submitBtn.disabled = false;

    // Hapus task lama dari array agar digantikan saat user men-submit ulang
    tasks = tasks.filter(t => t.id !== task.id);
    renderTasks();
    taskInput.focus();
  });

  // C. Event Hapus Task
  container.querySelector('.btn-delete').addEventListener('click', () => {
    tasks = tasks.filter(t => t.id !== task.id);
    renderTasks();
  });
}

/**
 * ==========================================
 * 3. CORE RENDER FUNCTION
 * ==========================================
 */

/**
 * Fungsi utama untuk merender ulang seluruh daftar task ke DOM.
 * Menangani penyaringan filter, pengurutan, manipulasi empty state,
 * pembuatan elemen `<li>`, dan pembaruan counter.
 */
function renderTasks() {
  // 1. Kosongkan elemen <ul> dari iterasi sebelumnya
  ul.innerHTML = '';

  // 2. Filter array `tasks` berdasarkan segmen yang dipilih pengguna
  const filteredTasks = tasks.filter(task => {
    if (currentFilter === 'active') return !task.isDone;
    if (currentFilter === 'complete') return task.isDone;
    return true; // Mode 'all'
  });

  // 3. KONDISI KOSONG: Tampilkan pesan empty state jika tidak ada task yang cocok
  if (filteredTasks.length === 0) {
    emptyState.style.display = 'flex';
    if (ul.parentElement) ul.remove(); // Lepas elemen <ul> dari DOM
    updateCount();
    return;
  }

  // 4. KONDISI ADA DATA: Sembunyikan empty state & pasang <ul> ke kontainer utama
  emptyState.style.display = 'none';
  if (!contentArea.contains(ul)) {
    contentArea.append(ul);
  }

  // 5. Urutkan task: Task aktif di atas (0), Task selesai di bawah (1)
  filteredTasks.sort((a, b) => a.isDone - b.isDone);

  // 6. Loop array yang sudah difilter & diurutkan untuk membuat elemen DOM
  for (const task of filteredTasks) {
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="task__box">
        <div class="task__box-content">
          <div class="check-btn">
            <img src="./img/icon-check.svg" alt="Icon check"/>
          </div>
          <p class="task__task-desc" title="${task.text}"></p>
        </div>
        <div class="task__box-btns">
          <button type="button" class="task__box-btn btn-edit">
            <img src="./img/icon-sqr-pen.svg" alt="Icon square pen"/>
          </button>
          <button type="button" class="task__box-btn btn-delete">
            <img src="./img/icon-trash.svg" alt="Icon trash"/>
          </button>
        </div>
      </div>
    `;

    // Ambil elemen paragraf dan isi teksnya secara aman dari XSS via textContent
    const taskDesc = li.querySelector('.task__task-desc');
    taskDesc.textContent = task.text;

    // Update styling status check dan pasang event listener tombol aksi
    renderCheckBtnUI(task, li);
    bindTaskEvents(task, li);

    // Masukkan <li> ke dalam <ul>
    ul.append(li);
  }

  // 7. Perbarui angka statistik di header
  updateCount();
}

/**
 * ==========================================
 * 4. EVENT LISTENERS UTAMA
 * ==========================================
 */

/** Validasi realtime saat pengguna mengetik di kolom input */
taskInput.addEventListener('input', () => {
  currentValue = taskInput.value.trim();

  if (currentValue !== '') {
    taskInput.setAttribute('value', currentValue);
    submitBtn.classList.remove('btn--disabled');
    submitBtn.classList.add('btn--enabled');
    submitBtn.disabled = false;
  } else {
    taskInput.removeAttribute('value');
    submitBtn.classList.remove('btn--enabled');
    submitBtn.classList.add('btn--disabled');
    submitBtn.disabled = true;
  }
});

/** Menangani penambahan task baru saat menekan tombol 'Enter' pada input */
taskInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && currentValue !== '') {
    e.preventDefault();

    tasks.push({
      id: nextId++,
      text: currentValue,
      isDone: false,
    });

    renderTasks();
    resetInput();
  }
});

/** Menangani penambahan task baru saat tombol 'Add' diklik */
submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (currentValue === '') return;

  tasks.push({
    id: nextId++,
    text: currentValue,
    isDone: false
  });

  renderTasks();
  resetInput();
});

/** Event Handlers untuk Pengalihan Filter (Segmented Control) */
taskSegment.addEventListener('click', () => {
  currentFilter = 'all';
  renderSegments();
  renderTasks();
});

activeSegment.addEventListener('click', () => {
  currentFilter = 'active';
  renderSegments();
  renderTasks();
});

completedSegment.addEventListener('click', () => {
  currentFilter = 'complete';
  renderSegments();
  renderTasks();
});

/**
 * ==========================================
 * 5. INITIAL EXECUTION
 * ==========================================
 */
renderSegments();
renderTasks();