const readline = require('readline-sync');

//membuat variabel global kosong yang nanti akan dibaca.
let list1= [];
let list2= [];
let mainList = [];
let results = '';

// fungsi untuk memasukkan elemen sebuah array ke array yang baru
function fillArray(fillerArray, filledArray){
    for (let i = 0; i < fillerArray.length; i++){
        filledArray.push(fillerArray[i])
    };
};
// validasi jika user memasukkan input kosong dan bukan angkan / NaN
while (true){
    const inputList1 = readline.question('Enter list1: ');
    const inputList2 = readline.question('Enter list2: ');
//fungsi membaca tiap elemen array dan memastikan tidak ada elemen kosong dan bukan angka
    function isValid(array){
        for (let i = 0;  i < array.length; i++){
            if (array[i] === '' || isNaN(array[i])){
                return false;
            };
        };
        return true;
    };
//membuat array list1 dan list 2 dari input 1 dan 2 dengan menggunakan split di spasi
    list1 = inputList1.split(' ');
    list2 = inputList2.split(' ')
// eksekusi fungsi isValid jika salah satu terpenuhi maka akan mengulang loop
    if (!isValid(list1) || !isValid(list2)){
        console.log('Input cannot empty and another character! Please try again.\n');
        continue;
    };

    break;
};
// isi array mainList dengan array list1 dan list 2
fillArray(list1, mainList);
fillArray(list2, mainList);
//loop untuk merapikan / sorting elemen array supaya berurutan
for (let i = 0; i < mainList.length; i++){
//bandingkan elemen array mulai dari awal dengan elemen sesudahnya
    for (let j = 0; j < mainList.length - 1; j++ ){
    //kedua elemen dibandingkan dan harus diubah dari string menjadi number
        if ( +mainList[j] > +mainList[j + 1]){
//buat variabel yang berupa nilai sementara untuk diisi dengan elemen array awal yang kemudian
//akan dibandingkan
            let container = mainList[j];
            mainList[j] = mainList[j + 1];
            mainList[j + 1] = container;
        };
    };
};

// cetak elemen dalam array yang telah disorting menjadi sebuah string yang dipisahkan dengan spasi
for (let i = 0; i < mainList.length; i++){
    if (i === mainList.length - 1){
        results += mainList[i];
    } else{
    results += mainList[i] + ' ';
    };
};
//output gabungan array yang yang elemennya telah disorting dan diubah menjadi string
console.log(`The merge list is ${results}.`);