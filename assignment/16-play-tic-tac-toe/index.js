const readline = require('readline-sync');

/**
 * Representasi ID untuk Pemain
 */
const Player = {
  ONE : 0,
  TWO : 1,
};

/**
 * MODEL: Mengelola data papan permainan Tic-Tac-Toe
 * @param {number} gridSize - Ukuran baris dan kolom papan (misal: 3)
 */
function TicTacToeBoard(gridSize){
  this._gridSize = gridSize;
  // Membuat matriks 2D berisi null sesuai ukuran gridSize
  this._grid = Array(gridSize).fill(null).map(() => new Array(gridSize).fill(null));
  
  // Mengambil ukuran papan
  this.getGridSize = function(){
    return this._gridSize;
  };
  
  // Mengambil isi dari koordinat tertentu (Player.ONE, Player.TWO, atau null)
  this.getOccupant = function(row, col){
    return this._grid[row][col];
  };
  
  // Mengisi koordinat dengan ID Pemain
  this.setOccupant = function(row, col, player){
    this._grid[row][col] = player;
  };
  
  // Memeriksa apakah kotak tertentu masih kosong
  this.isCellEmpty = function(row, col){
    return this.getOccupant(row, col) === null;
  };
  
  // Validasi apakah koordinat yang dimasukkan berada di dalam jangkauan papan
  this.isValidCordinate = function(row, col){
    return row >= 0 && row < this._gridSize &&
      col >= 0 && col < this._gridSize;
  };
}

/**
 * VIEW: Mengelola visualisasi/tampilan papan ke terminal
 */
function TicTacToeBoardView(){
  // Pemetaan ID pemain ke simbol karakter teks
  this._symbolMap = {
    null: ' ',
    [Player.ONE]: 'X',
    [Player.TWO]: 'O',
  };
  
  // Mengambil simbol berdasarkan ID pemain
  this.getSymbol = function(player){
    return this._symbolMap[player];
  };
  
  // Mengubah data matriks board menjadi string teks papan yang rapi
  this.render = function(board){
    let output = ''; // Menggunakan 'output' (perbaikan typo)
    const hSeparator = '-'.repeat((board.getGridSize() * 4) + 1);

    for (let r = 0; r < board.getGridSize(); r++){
      output += hSeparator + '\n';

      let rowStr = '|';
      for (let c = 0; c < board.getGridSize(); c++){
        const occupant = board.getOccupant(r, c);
        const symbol = this.getSymbol(occupant) || ' ';

        rowStr += ` ${symbol} |`;
      }
      output += rowStr + '\n';
    }
    output += hSeparator;

    return output;
  };
}

/**
 * VIEW: Mengelola interaksi teks input dan output pesan di terminal
 * @param {number} gridSize - Ukuran papan permainan
 */
function PromptView(gridSize){
  this._gridSize = gridSize;
  this._boardView = new TicTacToeBoardView();

  // Meminta input baris dari pemain
  this.readRow = function(player){
    const symbol = this._boardView.getSymbol(player);
    return Number(
      readline.question(`Enter a row (0 - ${this._gridSize - 1}) for player ${symbol}: `)
    );
  };

  // Meminta input kolom dari pemain
  this.readColumn = function(player){
    const symbol = this._boardView.getSymbol(player);
    return Number(
      readline.question(`Enter a column (0 - ${this._gridSize - 1}) for player ${symbol}: `)
    );
  };

  // Menampilkan papan permainan saat ini
  this.diplayBoard = function(board){
    console.log('\n' + this._boardView.render(board));
  };

  // Menampilkan pesan kemenangan
  this.displayPlayerWon = function(player){
    const symbol = this._boardView.getSymbol(player);
    console.log(`\nPlayer ${symbol} won! 🎉`);
  };

  // Menampilkan pesan seri/draw
  this.displayDraw = function(){
    console.log('\nIt\'s a draw. 🤝');
  };

  // Menampilkan error koordinat di luar jangkauan papan
  this.displayInvalidCoordinateError = function(){
    console.log('Error: Invalid coordinate. Try again.');
  };

  // Menampilkan error jika kotak sudah diisi
  this.displayCellAlreadyOccupiedError = function(){
    console.log('Error: Cell already occupied. Try again.');
  };
}

/**
 * CONTROLLER: Mengatur logika jalannya permainan (Alur Utama)
 * @param {object} config - Objek konfigurasi, contoh: { gridSize: 3 }
 */
function TicTacToeController(config){
 this._board = new TicTacToeBoard(config.gridSize);
 this._promptView = new PromptView(config.gridSize);

 this._currentPlayer = Player.ONE; // Pemain pertama yang jalan
 this._moveCount = 0;              // Penghitung jumlah langkah yang sah

 /**
  * Memulai perulangan game utama hingga ada yang menang atau seri
  */
 this.initializeGame = function(){
  while(true){
    // 1. Tampilkan kondisi papan saat ini
    this._promptView.diplayBoard(this._board);

    // 2. Minta input koordinat yang valid dari pemain
    const input = this._retrieveRowAndColumn();
    const row = input[0];
    const col = input[1];

    // 3. Taruh bidak pemain di papan
    this._board.setOccupant(row, col, this._currentPlayer);

    // 4. CEK MENANG: Jika langkah ini membuat pemain menang, game langsung selesai
    if (this._isWon(row, col)){
      this._promptView.diplayBoard(this._board);
      this._promptView.displayPlayerWon(this._currentPlayer);
      break;
    }

    // LOGIKA ANDA: moveCount hanya bertambah jika langkah tersebut tidak memicu kemenangan
    this._moveCount++;

    // 5. CEK DRAW: Jika setelah moveCount bertambah nilainya penuh, game selesai seri
    if (this._isDraw()){
      this._promptView.diplayBoard(this._board);
      this._promptView.displayDraw();
      break;
    }

    // 6. Ganti giliran ke pemain berikutnya
    this._switchPlayer();
  }
 };

 /**
  * Melakukan perulangan prompt sampai pemain memasukkan koordinat kosong yang valid
  * @return {array} Berisi [row, col]
  */
 this._retrieveRowAndColumn = function(){
  let row;
  let col;

  while(true){
    row = this._promptView.readRow(this._currentPlayer);
    col = this._promptView.readColumn(this._currentPlayer);

    // Validasi jangkauan angka indeks koordinat
    if (!this._board.isValidCordinate(row, col)){
      this._promptView.displayInvalidCoordinateError();
      continue;
    }

    // Validasi ketersediaan kotak papan
    if (!this._board.isCellEmpty(row, col)){
      this._promptView.displayCellAlreadyOccupiedError();
      continue;
    }

    break; // Keluar loop jika input sudah valid semua
  }
  return [row, col];
 };

 /**
  * Mengubah giliran pemain aktif secara bergantian
  */
 this._switchPlayer = function(){
  this._currentPlayer = this._currentPlayer === Player.ONE 
    ? Player.TWO
    : Player.ONE;
 };

 /**
  * Memeriksa kondisi kemenangan berdasarkan langkah terakhir yang dilakukan
  * @param {number} lastRow - Koordinat baris terakhir
  * @param {number} lastCol - Koordinat kolom terakhir
  * @return {boolean} True jika menang
  */
 this._isWon = function(lastRow, lastCol){
  let gridSize = config.gridSize; // Mengambil angka ukuran dari objek config
  
  // A. Cek Kemenangan Horizontal (Satu Baris)
  let rowWin = true;
  for (let c = 0; c < gridSize; c++){
    if (this._board.getOccupant(lastRow, c) !== this._currentPlayer){
      rowWin = false;
      break;
    }
  }
  if (rowWin) return true;

  // B. Cek Kemenangan Vertikal (Satu Kolom)
  let columnWin = true;
  for (let r = 0; r < gridSize; r++){ // Menggunakan 'r' agar tidak infinite loop
    if (this._board.getOccupant(r, lastCol) !== this._currentPlayer){
      columnWin = false;
      break;
    }
  }
  if (columnWin) return true;

  // C. Cek Kemenangan Diagonal Utama (Top-Left ke Bottom-Right)
  if (lastRow === lastCol){
    let majorDiagonalWin = true;
    for (let i = 0; i < gridSize; i++){
      if (this._board.getOccupant(i, i) !== this._currentPlayer){
        majorDiagonalWin = false;
        break;
      }
    }
    if (majorDiagonalWin) return true;
  } 

  // D. Cek Kemenangan Diagonal Pembantu (Top-Right ke Bottom-Left)
  if (lastRow + lastCol === gridSize - 1){
    let minorDiagonalWin = true;
    for (let i = 0; i < gridSize; i++){
      if (this._board.getOccupant(i, gridSize - i - 1) !== this._currentPlayer){
        minorDiagonalWin = false;
        break;
      }
    }
    if (minorDiagonalWin) return true;
  }

  return false; // Jika tidak ada kondisi terpenuhi, berarti belum menang
 };

 /**
  * Memeriksa apakah jumlah langkah sudah mencapai batas maksimal kotak papan
  * @return {boolean} True jika seri
  */
 this._isDraw = function(){
    return this._moveCount === this._board.getGridSize() ** 2;
 };
}

// ==========================================
// EKSEKUSI PROGRAM UTAMA
// ==========================================
const controller = new TicTacToeController({ gridSize: 3 });
controller.initializeGame();