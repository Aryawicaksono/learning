const readline = require('readline-sync');
// buat variabel global agar bisa dibaca secara global
let list1 = [];
let list2 = [];
//fungsi pembanding array. pertama tentukan panjang keua array harus sama
//kemudian bandingkan 2 elemen di index yang sama dan benar jika valuenya sama
function isArrayStrict(array1,array2){
//membandingkan panjang array
    if (array1.length !== array2.length){
        return false;
    };
//membandingkan value array pada index yang sama
    for (let i = 0; i < array1.length; i++){
        if (array1[i] !== array2[i]){
            return false;
        };
    };
    return true;
};
//validasi untuk mengecek adanya elemen kosong di kedua array
while (true){
    function isElementValid(array){
        for (let i = 0; i < array.length; i++){
            if (array[i] === ''){
                return false;
            };
        };
        return true;
    }
// input awal
    const inputList1 = readline.question('Enter list1: ');
    const inputList2 = readline.question('Enter list2: ');
// array yang dibuat dari kedua input dengan pembagi data spasi
    list1 = inputList1.split(' ');
    list2 = inputList2.split(' ');

    if (!isElementValid(list1) || !isElementValid(list2)){
        console.log('Elemen anda ada yang kosong! Silakan ulangi lagi.\n');
        continue;
    };

    break;
};
// jalankan fungsi pembanding.
if (isArrayStrict(list1, list2)){
    console.log('Two lists are strictly identical');
} else {
    console.log('Two lists are not strictly identical');
};