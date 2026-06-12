/**
 * Struktur objek untuk data pengguna.
 * @typedef {Object} User
 * @property {number} id - ID unik pengguna.
 * @property {string} nama - Nama pengguna.
 */

/**
 * Map untuk menyimpan log aktivitas terakhir dari setiap user.
 * Key berupa objek User, Value berupa timestamp (number).
 * @type {Map<User, number>}
 */
const logActivity = new Map();

/**
 * Melacak aktivitas klik user untuk mendeteksi spamming berdasarkan jeda waktu.
 * * @param {User} person - Objek user yang melakukan aktivitas klik.
 * @param {number} currentTime - Timestamp waktu saat ini dalam milidetik (ms).
 * @returns {string} Pesan status apakah akses aman atau terdeteksi spam.
 * * @example
 * const userAndi = { id: 101, nama: "Andi" };
 * activityTracking(userAndi, 1000); // Keterangan: "This access is safe."
 * activityTracking(userAndi, 1500); // Keterangan: "Spam detected! This access has been blocked."
 */
function activityTracking(person, currentTime) {
  if (logActivity.has(person)) {
    const lastTime = logActivity.get(person);
    const gap = currentTime - lastTime;

    logActivity.set(person, currentTime);

    if (gap < 2000) {
      return 'Spam detected! This access has been blocked.';
    } else {
      return 'This access is safe.';
    }
  } else {
    logActivity.set(person, currentTime);
    return 'This access is safe.';
  }
}