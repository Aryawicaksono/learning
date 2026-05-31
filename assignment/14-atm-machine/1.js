/**
 * SISTEM SIMULASI MESIN ATM
 * Menggunakan Pola Arsitektur MVC (Model-View-Controller) Sederhana
 */

const readline = require('readline-sync');

// ==========================================
// 1. MODEL COMPONENT (Struktur Data Murni)
// ==========================================

/**
 * Konstruktor untuk membuat objek Akun Nasabah baru.
 * @param {number} id - ID unik milik nasabah.
 * @param {number} initialBalance - Saldo awal saat akun dibuat.
 */
function Account(id, initialBalance){
    this.id = id;
    this.balance = initialBalance;

    /**
     * Mengurangi saldo akun (Tarik Tunai).
     * @param {number} amount - Nominal uang yang ditarik.
     */
    this.withdraw = function(amount){
        this.balance -= amount;
    };

    /**
     * Menambah saldo akun (Setor Tunai).
     * @param {number} amount - Nominal uang yang disetor.
     */
    this.deposit = function(amount){
        this.balance += amount;
    }
}

// ==========================================
// 2. CONTROLLER COMPONENT (Manajemen Logika Data)
// ==========================================

/**
 * Kontroler untuk mengelola kumpulan data akun di dalam sistem.
 */
function AccountController(){
    // Tempat menyimpan database seluruh objek Account nasabah
    this.accounts = [];

    /**
     * Membuat akun massal secara otomatis untuk simulasi awal database.
     * @param {number} count - Jumlah akun yang ingin dibuat.
     */
    this.generateInitialAccount = function(count){
        for (let i = 0; i < count; i++){
            // Setiap akun diberi saldo awal default sebesar 100
            const account = new Account(i, 100);
            this.accounts.push(account);
        }
    }

    /**
     * Mencari akun spesifik berdasarkan ID di dalam database array.
     * @param {number} id - ID akun yang dicari.
     * @returns {Account|undefined} Mengembalikan objek Account jika ketemu, atau undefined jika zonk.
     */
    this.findAccount = function(id){
        for (let i = 0; i < this.accounts.length; i++){
            const account = this.accounts[i];
            if (account.id === id){
                return account; // Langsung kembalikan objek akun jika ID cocok
            }
        }
        return undefined; // Jika loop selesai dan tidak ketemu
    }
}

// ==========================================
// 3. ENUM PATTERN (Standarisasi Menu Angka)
// ==========================================

/**
 * Kamus konstanta menu agar kode Switch-Case di bawah mudah dibaca manusia 
 * tanpa menggunakan angka gaib (magic numbers).
 */
const Menu = {
    CHECK_BALANCE: 1,
    WITHDRAW: 2,
    DEPOSIT: 3,
    EXIT: 4,
}

/**
 * Fungsi pembantu untuk mencetak daftar menu utama ke layar terminal.
 */
function logMenu(){
    console.log(`Main menu
1: check balance
2: withdraw
3: deposit
4: exit`)
}

// ==========================================
// 4. VIEW / INTERFACE (Alur Eksekusi Utama)
// ==========================================

// Inisialisasi Kontroler dan buat 10 akun dummy awal (ID: 0 - 9)
const accountController = new AccountController();
accountController.generateInitialAccount(10);

// --- LOOP UTAMA (Menjaga Mesin ATM Tetap Menyala) ---
while (true){
    // Meminta ID pengguna dan langsung dikonversi ke tipe data Angka menggunakan tanda +
    const accountId = +readline.question('Enter an id: ');
    const account = accountController.findAccount(accountId);

    // VALIDASI: Jika akun tidak ditemukan di database
    if (!account){
        console.log(`Account with account id "${accountId}" is not found. Please enter the correct id`);
        continue; // Lompat kembali ke atas loop untuk meminta ID baru
    }

    console.log('');

    let choice;

    // --- LOOP MENU (Transaksi Internal Akun Nasabah) ---
    // Menggunakan do-while karena menu minimal harus tampil sekali sejak awal login sukses
    do {
        logMenu();
        choice = +readline.question('Enter a choice: ');

        switch (choice){
            case Menu.CHECK_BALANCE:
                // .toFixed(1) digunakan untuk menampilkan satu angka di belakang koma (desimal)
                console.log(`The balance is ${account.balance.toFixed(1)}`)
                break;
                
            case Menu.WITHDRAW:
                const withdrawalAmount = +readline.question('Enter an amount to withdraw: ');
                account.withdraw(withdrawalAmount);
                break;
                
            case Menu.DEPOSIT:
                const depositedAmount = +readline.question('Enter an amount to deposit: ');
                account.deposit(depositedAmount);
                break;
                
            case Menu.EXIT:
                // Keluar dari switch-case, lalu kondisi do-while akan mengeceknya untuk keluar loop menu
                break;
        }

        console.log('')
    } while (choice !== Menu.EXIT) // Loop menu akan terus berputar selama nasabah tidak memilih opsi 4 (EXIT)
}