const readline = require('readline-sync');

// =========================================================================
// 1. MODEL BLUEPRINT (STRUKTUR DATA OBJEK)
// =========================================================================

/**
 * Blueprint Konstruktor untuk membuat Objek Buku.
 * @constructor
 * @param {number} id - ID unik untuk mengidentifikasi buku.
 * @param {string} title - Judul dari buku tersebut.
 */
function Book(id, title){
  this.id = id;
  this.title = title;
  this.isBorrowed = false; // Status awal: false artinya buku tersedia di rak/belum dipinjam
}

/**
 * Blueprint Konstruktor untuk membuat Objek Anggota Perpustakaan.
 * @constructor
 * @param {number} id - ID unik untuk mengidentifikasi anggota (misal: 100).
 * @param {string} name - Nama dari anggota.
 */
function Member(id, name){
  this.id = id;
  this.name = name;
  /** @type {Book[]} Array dinamis untuk menyimpan daftar referensi objek buku yang sedang dipinjam */
  this.borrowedBook = [];
}

// =========================================================================
// 2. LAYER CONTROLLER (LOGIKA PENGENDALI DATA)
// =========================================================================

/**
 * Pengendali utama untuk mengelola koleksi data buku di perpustakaan.
 * @constructor
 */
function BookController(){
  /** @type {Book[]} Array internal tempat menyimpan semua instans objek Buku */
  this.books = [];

  /**
   * Mengonversi array objek mentah (raw data) menjadi instans objek model Book.
   * @param {Object[]} data - Data mentah array dari sumber database luar.
   * @returns {Book[]} Mengembalikan array berisi objek-objek Book asli.
   */
  this.generateBooks = function(data){
    // Menggunakan forEach untuk mengitari data mentah satu per satu
    data.forEach(item => {
      // Membuat objek baru berbasis blueprint model Book
      const books = new Book(item.id, item.title);
      // Memasukkan objek baru tersebut ke dalam array penampung utama controller
      this.books.push(books);
    });
    return this.books; // Mengembalikan array hasil instansiasi agar bisa ditampung di global scope
  }

  /**
   * Mencari satu objek buku secara manual berdasarkan ID-nya (Linear Search).
   * @param {number} id - ID buku yang ingin dicari.
   * @returns {Book|undefined} Mengembalikan objek Book utuh jika cocok, atau undefined jika tidak ketemu.
   */
  this.findBookId = function(id){
    let targetBook; // Variabel penampung di luar scope callback forEach
    
    this.books.forEach(book => {
      if (book.id === id){
        targetBook = book; // Jika ID cocok, ikat referensi objek buku tersebut ke variabel penampung
      }
    });
    return targetBook; // Dikembalikan setelah seluruh iterasi selesai berjalan
  }
}

/**
 * Pengendali utama untuk mengelola koleksi data anggota di perpustakaan.
 * @constructor
 */
function MemberController(){
  /** @type {Member[]} Array internal tempat menyimpan semua instans objek Anggota */
  this.members = [];

  /**
   * Mengonversi array objek mentah menjadi instans objek model Member.
   * @param {Object[]} data - Data mentah array anggota.
   * @returns {Member[]} Mengembalikan array berisi objek-objek Member asli.
   */
  this.generateMembers = function(data){
    data.forEach(item => {
      const members = new Member(item.id, item.name);
      this.members.push(members);
    });
    return this.members;
  }

  /**
   * Mencari satu objek anggota secara manual berdasarkan ID-nya.
   * @param {number} id - ID anggota yang dicari.
   * @returns {Member|undefined} Mengembalikan objek Member utuh jika cocok, atau undefined.
   */
  this.findMember = function(id){
    let targetMember;
    this.members.forEach(member =>{
      if (member.id === id){
        targetMember = member;
      }
    });
    return targetMember;
  }
}

// =========================================================================
// 3. SEEDER DATA & KONFIGURASI GLOBAL INITIALIZATION
// =========================================================================

/** @type {Object[]} Data mentah database buku */
const Books = [
  {id: 0, title: 'Harry Potter'}, 
  {id: 1, title: 'Clean Code'}, 
  {id: 2, title: 'Javascript 101'}
];

/** @type {Object[]} Data mentah database anggota */
const Members = [
  {id: 100, name: 'Arya'}, 
  {id: 101, name: 'Wicaksono'}
];

/** @type {Object} Enum pemetaan angka menu (Read-Only State Management) */
const Menu = {
  VIEW_LIBRARY_STATUS: 1,
  BORROW_A_BOOK: 2,
  RETURN_ALL_BOOKS: 3,
  EXIT: 4,
}

/**
 * Mencetak daftar instruksi pilihan menu utama ke layar terminal console.
 */
function logMenu(){
  console.log(`Main Menu:
1. View Library Status
2. Borrow a Book
3. Return All Books
4. Exit`);
}

// Menginisialisasi controller dan men-generate data master runtime aplikasi
const bookController = new BookController();
const memberController = new MemberController();
const books = bookController.generateBooks(Books);
const members = memberController.generateMembers(Members);

let choice; // Menampung pilihan angka menu user global

// =========================================================================
// 4. CORE ENGINE PROGRAM INTERACTIVE (LOOP RUNTIME)
// =========================================================================

do {
  console.log('');
  logMenu();
  
  // Mengonversi input string terminal dari user langsung menjadi tipe data Number menggunakan operator +
  choice = +readline.question('Enter choice: ');
  
  /** * VARIABEL SAKRAL: Dideklarasikan di level atas lingkup do-while agar ia 
   * otomatis di-reset ulang menjadi 'undefined' setiap kali putaran menu baru dimulai.
   */
  let targetMember;

  switch (choice){
    
    case Menu.VIEW_LIBRARY_STATUS:
      // --- SUB-MENU A: CETAK DAFTAR BUKU ---
      console.log('--- Library Books --');
      books.forEach(book => {
        // Menggunakan operator ternary untuk mengubah boolean true/false menjadi teks deskriptif
        const status = book.isBorrowed ? 'Borrowed' : 'Available';
        console.log(`ID: ${book.id} | Title: ${book.title} | Status: ${status}`);
      });
      
      console.log('');
      
      // --- SUB-MENU B: CETAK DAFTAR ANGGOTA ---
      members.forEach((member, index) => {
        const borrowedBook = member.borrowedBook; // Mengambil array buku milik anggota saat ini
        let status;
        
        // Pengecekan Kondisi: Apakah keranjang buku kosong?
        if (borrowedBook.length === 0){
          status = 'None';
        } else {
          // LOGIKA NESTED FOREACH: Jika ada buku, kumpulkan seluruh judulnya ke dalam array teks baru
          let booksTitles = [];
          borrowedBook.forEach(book => {
            booksTitles.push(book.title); // Mengambil string judul dari objek buku
          });
          // Menggabungkan elemen array teks menjadi satu baris lurus dipisahkan tanda koma
          status = `[ ${booksTitles.join(', ')} ]`;
        }
        console.log(`ID: ${member.id} | Name: ${member.name} | Borrowed: ${status}`);
      });
      break;

    case Menu.BORROW_A_BOOK:
      // TAHAP 1: Loop Abadi Validasi ID Anggota
      while(true){
        const memberId = +readline.question('Enter Member ID: ');
        targetMember = memberController.findMember(memberId);

        if (!targetMember){
          console.log('Id is not registered! Please try again');
          continue; // Jika salah, lompat ke baris atas meminta input ID ulang
        }
        break; // Jika anggota terdaftar, jebol keluar dari loop validasi ini
      }

      // TAHAP 2: VALIDASI PERPUSTAKAAN KOSONG (INFINITE LOOP PROTECTION)
      let isBookAvailable = false;
      books.forEach(book => {
        if (!book.isBorrowed){
          isBookAvailable = true; // Tandai true jika terbukti minimal ada 1 buku yang bebas dipinjam
        }
      });

      // Jika kondisi di atas tetap false (berarti semua buku berstatus isBorrowed = true)
      if (!isBookAvailable){
        console.log('\n [ ALERT ] Sorry all books in library are currently borrowed');
        break; // Hentikan proses peminjaman seketika, lempar balik ke menu utama demi UX yang mulus
      }

      // TAHAP 3: Loop Abadi Validasi ID Buku
      let targetBook;
      while (true){
        const borrowedBookId = +readline.question('Enter Book ID: ');
        targetBook = bookController.findBookId(borrowedBookId);
        
        if (!targetBook){
          console.log('Book id is not registered! Please try again.');
          continue; // Mengulang baris input ID buku jika ID tidak terdaftar di sistem
        }
        if (targetBook.isBorrowed){
          console.log(`The book with id "${targetBook.title}" is borrowed. Try another book.`);
          continue; // Mengulang baris input ID buku jika buku tersebut sedang dipegang orang lain
        }
        break; // Lolos semua validasi buku, keluar dari loop validasi buku
      }

      // TAHAP 4: EKSEKUSI MUTASI DATA (REFERENCE MUTATION)
      targetBook.isBorrowed = true; // Ubah status master buku menjadi terpinjam
      targetMember.borrowedBook.push(targetBook); // Dorong objek buku utuh masuk ke array keranjang milik anggota
      console.log(`Success! ${targetMember.name} has borrowed "${targetBook.title}".`);
      break;

    case Menu.RETURN_ALL_BOOKS:
      // TAHAP 1: Loop Abadi Validasi ID Anggota untuk Pengembalian
      while (true){
        const memberId = +readline.question('Enter Member ID: ');
        targetMember = memberController.findMember(memberId);

        if (!targetMember){
          console.log('Id is not registered! Please try again');
          continue;
        }
        break;
      }

      // TAHAP 2: Ambil referensi array buku pinjamannya
      const targetBooks = targetMember.borrowedBook;

      // Cegatan Validasi: Pastikan dia memang sedang meminjam buku sebelum memproses pemulihan
      if (targetBooks.length === 0){
        console.log(`User "${targetMember.name}" doesn't borrow a book.`);
        break; // Keluar dari case pengembalian jika terbukti keranjang pinjamannya kosong melongo
      }
      
      // TAHAP 3: PEMULIHAN STATUS RAK BUKU PERPUSTAKAAN
      // Karena bertipe data Objek Referensi, mengubah properti di dalam array ini akan langsung 
      // ikut memperbarui status data buku yang ada di dalam array utama 'books'.
      targetBooks.forEach(book => {
        book.isBorrowed = false; // Ubah status buku balik menjadi tersedia
      });

      // TAHAP 4: PENGOSONGAN TOTAL KERANJANG ANGGOTA
      // Mengubah panjang (.length) menjadi 0 adalah metode paling mutakhir, aman, dan cepat 
      // untuk menghapus bersih seluruh isi array di JavaScript tanpa memicu pergeseran indeks.
      targetBooks.length = 0;
      console.log(`Member "${targetMember.name}" has returned all the borrowed books.`);
      break;
  }
} while (choice !== Menu.EXIT) // Aplikasi akan terus menyala berputar selama pilihan user bukan angka 4 (Exit)

console.log('\n-- Thanks for using this library app --');