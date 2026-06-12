/**
 * Master harga produk yang tersedia di toko.
 * @type {Map<string, number>}
 */
const masterPrice = new Map([
  ['Susu', 15000],
  ['Roti', 10000],
  ['Kopi', 5000]
]);

/**
 * Keranjang belanja milik pelanggan.
 * @type {Map<string, number>}
 */
const basket = new Map([
  ['Susu', 2],
  ['Kopi', 3]
]);

/**
 * Menghitung total pembayaran belanjaan setelah dipotong diskon member.
 * * @param {Map<string, number>} basket - Map yang berisi nama barang (string) dan jumlah yang dibeli (number).
 * @param {Map<string, number>} prices - Map master yang berisi nama barang (string) dan harga per unitnya (number).
 * @param {number} discount - Besar potongan harga dalam bentuk persen, rentang nilai antara 0 hingga 100.
 * @returns {number} Total harga bersih akhir yang harus dibayarkan oleh pelanggan.
 * * @example
 * const keranjang = new Map([['Kopi', 2]]);
 * const harga = new Map([['Kopi', 5000]]);
 * calculateTotalPayment(keranjang, harga, 10); // Mengembalikan: 9000
 */
function calculateTotalPayment(basket, prices, discount) {
  let total = 0;

  for (const [productName, quantity] of basket) {
    const price = prices.get(productName);
    
    if (price) {
      total += price * quantity;
    }
  }

  const discountAmount = total * (discount / 100);
  const finalTotal = total - discountAmount;

  return finalTotal;
}