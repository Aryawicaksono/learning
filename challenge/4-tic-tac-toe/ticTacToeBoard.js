'use strict'

class TicTacToeBoard{
  constructor(config = {gridSize: 3}){
    this._gridSize = config.gridSize;
    this._grid = new Array(config.gridSize).fill(null).map(() => new Array(config.gridSize).fill(null));
  }
  getGridSize(){
    return this._gridSize;
  };
  getOccupant(row, col){
    return this._grid[row][col];
  }
  setOccupant(row, col, player){
    this._grid[row][col] = player;
  }
  isCellEmpty(row, col){
    return this.getOccupant(row, col) === null;
  }
  isValidCoordinate(row, col){
    return row >= 0 && row < this._gridSize &&
      col >=0 && col < this._gridSize;
  }
}

module.exports = TicTacToeBoard;