const readline = require('readline-sync');

/**
 * Representasi blueprint untuk objek Mahasiswa (Model).
 * @constructor
 * @param {number} id - ID unik mahasiswa.
 * @param {string} name - Nama mahasiswa.
 * @param {number} score - Nilai angka ujian (0-100).
 */
function Student(id, name, score){
  this.id = id;
  this.name = name;
  this.score = score;
  this.grade = '-'; // Nilai huruf default sebelum dihitung di Menu 2
}

/**
 * Pengendali data koleksi mahasiswa (Controller).
 * @constructor
 */
function StudentController(){
  /** @type {Student[]} Array pusat penampung seluruh data mahasiswa */
  this.students = [];

  /**
   * Mentransformasikan array data mentah menjadi instans Objek Student.
   * @param {Object[]} data - Array objek mentah dari database/sumber data.
   * @returns {Student[]} Koleksi array objek Student yang telah di-generate.
   */
  this.generateStudents = function (data){
    data.forEach(item =>{
      // Menggunakan parameter 'item' agar tidak bentrok (shadowing) dengan parameter 'data'
      const student = new Student(item.id, item.name, item.score);
      this.students.push(student);
    })
    return this.students;
  }

  /**
   * Mencari data mahasiswa secara spesifik berdasarkan ID (Linear Search).
   * @param {number} id - ID mahasiswa yang dicari.
   * @returns {Student|undefined} Objek mahasiswa jika ditemukan, atau undefined jika tidak ada.
   */
  this.findStudent = function(id){
    let foundStudent; // Variabel penampung di luar scope forEach
    
    this.students.forEach(student =>{
      if (student.id === id){
        foundStudent = student; // Menyimpan referensi objek jika ID cocok   
      }
    })
    return foundStudent; // Dikembalikan di akhir setelah loop forEach selesai bermigrasi
  }
}

// ==========================================
// KONFIGURASI DATA & ENUM MENU
// ==========================================

/** @type {Object} Kumpulan opsi menu utama (Read-Only Enum) */
const Menu = {
  VIEW_ALL_STUDENTS: 1,
  CALCULATE_GRADES: 2,
  SHOW_CLASS_STATISTIC: 3,
  GIVE_BONUS_SCORE: 4,
  EXIT: 5,
}

/** @type {Object[]} Data mentah (Raw Data) sebagai modal awal program */
const studentsData = [
  {id: 0, name: 'Budi', score: 90,},
  {id: 1, name: 'Ani', score: 52,},
  {id: 2, name: 'Cici', score: 75,},
  {id: 3, name: 'Dedi', score: 48,},
  {id: 4, name: 'Ello', score: 80,}  
]

/**
 * Menampilkan daftar pilihan menu utama aplikasi ke console terminal.
 */
function logMenu(){
  console.log(`Main Menu:
1. View All Students
2. Calculate Grades
3. Show Class Statistics
4. Give Bonus Score
5. Exit`);
}

// ==========================================
// INISIALISASI RUNTIME
// ==========================================

const studentController = new StudentController();
// Eksekusi pembuatan data master mahasiswa
const students = studentController.generateStudents(studentsData);

let choice;

// ==========================================
// LOOPING APLIKASI UTAMA (DO-WHILE ENGINE)
// ==========================================

do {
  console.log('');
  logMenu();

  // Memaksa input string dari readline menjadi tipe data Number dengan operator unary plus (+)
  choice = +readline.question('Enter choice: ');

  switch (choice){
    case Menu.VIEW_ALL_STUDENTS:
      console.log('\n--- Student List ---');
      // Melakukan iterasi dan mencetak properti setiap mahasiswa secara satu baris lurus
      students.forEach(student => console.log(`ID: ${student.id} | ${student.name} | Score: ${student.score}| Grade: ${student.grade}`));
      break;

    case Menu.CALCULATE_GRADES:
      // Melakukan pembaruan properti .grade secara massal langsung ke referensi objek aslinya
      students.forEach(student => {
        if(student.score >= 85){
          student.grade = 'A';
        } else if (student.score >= 70){
          student.grade ='B';
        } else if (student.score >= 55){
          student.grade = 'C';
        } else {
          student.grade = 'D'
        }
      })
      console.log('Success! Grades have been calculated for all students.');
      break;

    case Menu.SHOW_CLASS_STATISTIC:
      let totalScore = 0; // Variabel penampung akumulasi (wajib ditaruh di luar scope callback)
      
      // Tahap 1: Kumpulkan seluruh total nilai terlebih dahulu
      students.forEach(student => totalScore += student.score);
      
      // Tahap 2: Lakukan kalkulasi rata-rata setelah totalScore selesai diakumulasi penuh
      const rate = Math.round(totalScore / students.length);

      console.log('--- Class Statistics ---');
      console.log(`Total Class Score: ${totalScore}`);
      console.log(`Class Average Score: ${rate}`);
      break;

    case Menu.GIVE_BONUS_SCORE:
      // Kondisi selektif: Hanya memanipulasi score mahasiswa yang memenuhi syarat < 60
      students.forEach(student => {
        if (student.score < 60){
          student.score += 5;
        }
      })
      console.log('Success! Bonus +5 points applied to students with score below 60.');
      break;
  }

} while (choice !== Menu.EXIT) // Perulangan berhenti seketika saat user menginputkan nilai 5

console.log('-- Terminal Closed --');