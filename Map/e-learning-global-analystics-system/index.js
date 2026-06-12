/**
 * @typedef {Object} StudentCard
 * @property {number} studentId - ID unik dari mahasiswa.
 * @property {string} name - Nama lengkap mahasiswa.
 * @property {'Premium' | 'Free'} tier - Tingkat keanggotaan mahasiswa.
 */

/**
 * Menganalisis log pembelajaran dan mengelompokkan mahasiswa unik yang belajar lebih dari 50 jam berdasarkan tier mereka.
 * * @param {Map<StudentCard, number>} enrollmentDatabase - Map master yang berisi objek informasi mahasiswa (StudentCard) sebagai KEY dan jumlah jam belajar (number) sebagai VALUE.
 * @returns {Map<'PREMIUM_STUDENTS' | 'FREE_STUDENTS', Set<string>>} Map laporan akhir yang berisi dua kategori utama dengan daftar nama mahasiswa yang unik di dalam Set.
 * * @example
 * const report = generatepremiumReport(globalLogs);
 * const premiumList = report.get('PREMIUM_STUDENTS'); // Mengembalikan: Set { 'Alice' }
 */
function generatepremiumReport(enrollmentDatabase){
  const premiumQualifiers = new Set();
  const freeQualifiers = new Set();

  for (const [student, hour] of enrollmentDatabase){
    if (hour > 50){
      if (student.tier === 'Premium'){
        premiumQualifiers.add(student.name)
      } else if (student.tier === 'Free'){
        freeQualifiers.add(student.name);
      }
    }
  }

  const finalReport = new Map();

  finalReport.set('PREMIUM_STUDENTS', premiumQualifiers);
  finalReport.set('FREE_STUDENTS', freeQualifiers);

  return finalReport;
}