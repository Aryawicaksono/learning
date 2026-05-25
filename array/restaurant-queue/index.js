const readline = require('readline-sync');

/**
 * =========================================================================
 * 1. CONSTRUCTOR FUNCTION (CETAKAN OBJEK)
 * =========================================================================
 * Digunakan untuk membuat objek pelanggan baru secara seragam.
 * Menghasilkan objek berbentuk: { name: 'NAMA', type: 'REGULAR'/'VIP' }
 */
function Person (name, type) {
    this.name = name;
    this.type = type;
}

/**
 * =========================================================================
 * 2. HELPER FUNCTION (FUNGSI PEMBANTU)
 * =========================================================================
 * Bertugas memeriksa apakah array antrean kosong atau tidak.
 * Mengembalikan nilai Boolean (true/false) agar aman digunakan sebagai 
 * gerbang validasi di dalam switch-case utama.
 */
function isQueueBlank(array) {
    if (array.length === 0) {
        console.log('Tidak ada antrean. Silakan pilih input yang lain.');
        return true; // Menandakan antrean kosong
    }
    return false; // Menandakan antrean ada isinya
}

// Database utama tempat menyimpan seluruh data antrean
let queue = [];

/**
 * =========================================================================
 * 3. LOOP UTAMA TERMINAL (PIRINGAN LUAR)
 * =========================================================================
 * Loop ini berjalan selamanya sampai user mengetik aksi 'EXIT'.
 */
while (true) {
    // Variabel penampung sementara yang di-reset setiap kali loop berputar kembali ke atas
    let customer = '';
    let type = '';
    let action = '';
    let isExit = false; // Sakelar penanda untuk memutus loop luar dari dalam switch-case

    console.log('\n--- Smart Restaurant Queue ---');
    console.log('(ARRIVE / CALL / CANCEL / REMOVE / MERGE / STATUS / EXIT)\n');

    /**
     * LOOP INPUT AKSI: Memastikan user memilih menu yang valid (Defensive Programming)
     */
    while (true) {
        const actionInput = readline.question('Choose action: ');
        action = actionInput.toUpperCase().trim();

        // Validasi ketat: Jika input tidak cocok dengan menu yang tersedia, minta ulang
        if (action !== 'ARRIVE' && 
            action !== 'CALL'   &&
            action !== 'CANCEL' &&
            action !== 'REMOVE' &&
            action !== 'MERGE'  &&
            action !== 'STATUS' &&
            action !== 'EXIT') {
                console.log('Your input is Incorrect! Please try again.');
                continue; // Lompat ke atas loop input aksi
        }
        break; // Lolos validasi, keluar dari loop input aksi
    }
    
    /**
     * PUSAT EKSEKUSI MENU (SWITCH-CASE)
     */
    switch (action) {
        
        // -----------------------------------------------------------------
        // CASE EXIT: MEMATIKAN PROGRAM
        // -----------------------------------------------------------------
        case 'EXIT':
            console.log('--- Terminal Closed ---');
            isExit = true; // Menyalakan sakelar keluar
            break;

        // -----------------------------------------------------------------
        // CASE ARRIVE: PELANGGAN BARU DATANG (MUTATED METHOD)
        // -----------------------------------------------------------------
        case 'ARRIVE':
            // Loop validasi input nama dan tipe customer
            while (true) {
                const customerName = readline.question('Enter customer name: ');
                customer = customerName.toUpperCase().trim();

                if (customerName === '') {
                    console.log('Please input your name.');
                    continue;
                }

                const typeName = readline.question('Enter type (Regular / VIP): ');
                type = typeName.toUpperCase().trim();

                if (type !== 'REGULAR' && type !== 'VIP') {
                    console.log('Your input is incorrect! Please fill the correct input.');
                    continue;
                }
                break; // Lolos validasi nama & tipe, keluar loop input
            }
            
            // Instansiasi objek baru berdasarkan cetakan Constructor Person
            const person = new Person(customer, type);
    
            // Penerapan konsep Mutated Method berdasarkan tingkatan prioritas
            if (person.type === 'REGULAR') {
                queue.push(person); // .push() -> Memasukkan data ke PALING BELAKANG
                console.log(`-> ${person.name} added to the back of the queue.`);
            } else if (person.type === 'VIP') {
                queue.unshift(person); // .unshift() -> Memasukkan data ke PALING DEPAN
                console.log(`-> ${person.name} added to the front of the VIP queue!`);
            }
            break;

        // -----------------------------------------------------------------
        // CASE CALL: MEMANGGIL ANTREAN TERDEPAN (MUTATED: SHIFT)
        // -----------------------------------------------------------------
        case 'CALL':
            if (isQueueBlank(queue)) {
                continue; // Jika kosong, batalkan aksi dan kembali ke menu utama
            }
            
            // JEBAKAN DATA CAMPURAN: Cek apakah antrean nomor 1 berupa Grup (Array) atau Orang Biasa (Objek)
            if (queue[0].length !== undefined) {
                // Jika .length tidak undefined, berarti kotak tersebut adalah Array grup rombongan
                console.log(`-> GROUP of ${queue[0].length} members is invited to enter the restaurant!`);
            } else {
                // Jika .length undefined, berarti kotak tersebut adalah Objek tunggal biasa
                console.log(`-> ${queue[0].name} is invited to enter the restaurant!`);
            }
            queue.shift(); // .shift() -> Menghapus elemen pertama di indeks 0
            break;

        // -----------------------------------------------------------------
        // CASE CANCEL: ANTREAN PALING BELAKANG PULANG (MUTATED: POP)
        // -----------------------------------------------------------------
        case 'CANCEL':
            if (isQueueBlank(queue)) {
                continue;
            }
            
            // Mencari nomor indeks terakhir di dalam array secara dinamis
            let lastIndex = queue.length - 1;
            
            // Proteksi data campuran untuk elemen paling belakang sebelum di-pop
            if (queue[lastIndex].length !== undefined) {
                console.log(`-> A GROUP of ${queue[lastIndex].length} members canceled the queue and went home.`);
            } else {
                console.log(`-> ${queue[lastIndex].name} canceled the queue and went home.`);
            }
            queue.pop(); // .pop() -> Menghapus elemen terakhir dari array
            break;

        // -----------------------------------------------------------------
        // CASE REMOVE: MENGHAPUS ORANG SECARA SPESIFIK (MUTATED: SPLICE)
        // -----------------------------------------------------------------
        case 'REMOVE':
            if (isQueueBlank(queue)) {
                continue;
            }
        
            const nameToRemoveInput = readline.question('Enter customer name to remove: ');
            const nameToRemove = nameToRemoveInput.toUpperCase().trim();
            let targetNameIndex = -1;
            let counter = 0; // Membuat variabel penghitung manual untuk mencatat nomor indeks

            /**
             * ATURAN FOR...OF PADA DATA CAMPURAN:
             * Saat loop berjalan, variabel 'element' bisa berupa Objek {} atau Array [].
             * Kita harus menyaringnya menggunakan trik '.length === undefined'.
             */
            for (const element of queue) {
                if (element.length === undefined) { // Pastikan kotak ini murni Objek tunggal
                    if (element.name === nameToRemove) {
                        targetNameIndex = counter; // Kunci nomor indeksnya
                        break;
                    }
                }             
                counter++; // Naikkan indeks manual seiring berjalannya loop
            }
            
            // Eksekusi penghapusan jika indeks target ditemukan
            if (targetNameIndex !== -1) {
                queue.splice(targetNameIndex, 1); // .splice(mulai, hapusBerapa) -> Memotong isi tengah array
                console.log(`-> ${nameToRemove} has been specifically removed from the queue.`);
            } else {
                console.log(`-> Customer named ${nameToRemove} not found in the queue.`);
            }
            break;

        // -----------------------------------------------------------------
        // CASE MERGE: MEMBUAT GRUP PRIVAT MENGIKUTI TEMAN DI DEPAN
        // -----------------------------------------------------------------
        case 'MERGE':
            if (isQueueBlank(queue)) {
                continue;
            }

            let isMergeDone = false; // Penanda khusus agar bisa menembus keluar dari loop while di bawah

            while (true) {
                const nameToMergeInput = readline.question('Enter group names (separated by comma): ');
                if (nameToMergeInput.trim() === '') {
                    console.log('Name cannot empty! Please try again.');
                    continue;
                }

                // Memecah teks string menjadi array kumpulan nama mentah
                const mergedNames = nameToMergeInput.split(',');

                // For tradisional untuk memproses manipulasi teks langsung pada nilai indeks array asli
                for (let i = 0; i < mergedNames.length; i++) {
                    mergedNames[i] = mergedNames[i].toUpperCase().trim();
                }

                let indexInQueue = -1;
                let existPerson = null;
             
                /**
                 * TAHAP 1: MENCARI APAKAH ADA ANGGOTA GRUP YANG SUDAH MENGANTRE DI DEPAN
                 */
                for (let i = 0; i < queue.length; i++) {
                    if (queue[i].length === undefined) { // Hanya memeriksa objek tunggal biasa
                        for (const inputName of mergedNames) {
                            if (queue[i].name === inputName) {
                                indexInQueue = i; // Mengunci posisi indeks terdepan sebagai jangkar grup
                                existPerson = queue[i]; // Menyimpan data objek orang tersebut
                                break;
                            }
                        }
                    }
                    if (indexInQueue !== -1) break; // Hentikan loop utama jika jangkar sudah ketemu
                }

                const groupArray = []; // Wadah berbentuk array untuk mengikat rombongan menjadi satu kesatuan

                /**
                 * TAHAP 2: PROSES PENYATUAN GRUP (LOGIKA BERLIAN ANDA)
                 */
                if (indexInQueue !== -1) {
                    // KONDISI A: Jika ada teman yang mengantre di depan
                    groupArray.push(existPerson); // Masukkan orang lama tersebut sebagai anggota pertama grup

                    // Cari nama sisa lainnya yang diinput oleh user
                    for (const name of mergedNames) {
                        if (name !== '' && name !== existPerson.name) {
                            
                            // Jika nama sisa tersebut ternyata ada di antrean belakang, hapus dulu agar tidak ganda
                            for (let j = 0; j < queue.length; j++) {
                                if (queue[j].length === undefined && queue[j].name === name) {
                                    queue.splice(j, 1); // Hapus orang tersebut dari barisan belakang
                                    break;
                                }
                            }
                            // Buat objek Person baru untuk nama sisa tersebut dan masukkan ke grup
                            groupArray.push(new Person(name, 'REGULAR'));
                        }
                    }
                    
                    // .splice(posisi, gantiBerapa, dataBaru) -> Ganti objek tunggal di depan dengan array grup utuh
                    queue.splice(indexInQueue, 1, groupArray);
                    console.log(`-> Merged successfully! The group follows ${existPerson.name}'s position at slot number ${indexInQueue + 1}.`);
                
                } else {
                    // KONDISI B: Jika semua nama dalam rombongan adalah orang baru
                    for (const name of mergedNames) {
                        if (name !== '') {
                            groupArray.push(new Person(name, 'REGULAR'));
                        }
                    }
                    queue.push(groupArray); // Masukkan seluruh kotak grup ke paling belakang antrean utama
                    console.log(`-> New group successfully added to the back of the queue.`);
                }
                
                isMergeDone = true; // Set true agar menandakan sub-proses merge telah selesai
                break; // Keluar dari loop while(true) milik MERGE
            } 
            if (isMergeDone) break; // Keluar dari SWITCH-CASE menuju piringan luar
            break;

        // -----------------------------------------------------------------
        // CASE STATUS: MENAMPILKAN VISUAL ANTREAN (UNMUTATED: SLICE + FOR...OF)
        // -----------------------------------------------------------------
        case 'STATUS':
            console.log('\n--- Current Position ---');

            if (queue.length === 0) {
                console.log('Queue is empty');
            } else {
                let index = 1; // Variabel penanda nomor urut antrean visual
                
                // .slice() -> Mengkloning/menyalin array secara utuh (Unmutated) agar aman dibaca
                const viewQueue = queue.slice();

                for (const element of viewQueue) {
                    // Pengecekan cerdas tipe data campuran
                    if (element.length !== undefined) {
                        // Jika elemen ber-properti panjang, berarti kotak ini berisi grup rombongan (Array)
                        let groupNames = [];

                        // Lakukan perulangan di dalam perulangan (Nested Loop for...of) untuk membedah isi grup
                        for (const person of element) {
                            groupNames.push(person.name);
                        }
                        // .join(',') -> Menggabungkan array teks menjadi satu string utuh dipisahkan koma
                        console.log(`${index}. GROUP: [${groupNames.join(', ')}]`);
                    } else {
                        // Jika elemen tidak ber-properti panjang, berarti kotak ini adalah Objek tunggal biasa
                        console.log(`${index}. ${element.name} (${element.type})`);
                    }
                    index++; // Menaikkan nomor urut visual
                }
            }
            break;   
    }

    /**
     * PINTU KELUAR UTAMA PROGRAM
     * Mengecek apakah sakelar isExit bernilai true. Jika iya, patahkan loop while luar.
     */
    if (isExit) {
        break;
    }
}