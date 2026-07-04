'use strict'

const {Player} = require('./constant')

class TicTacToeView {
  constructor(){
    this._symbolMap = {
      null: ' ',
      [Player.ONE]: 'X',
      [Player.TWO]: 'O',
    }
  }
  getSymbol(player){
    return this._symbolMap[player];
  }
  render(board){
    let output = ' ';
    const hSeparator = '-'.repeat((board.getGridSize() * 4) + 1);

    for (let r = 0; r < board.getGridSize(); r++){
      output += hSeparator + '\n';

      let rowStr = '|';

      for (let c = 0; c < board.getGridSize(); c++){
        const occupant = board.getOccupant(r, c);
        const symbol = this.getSymbol(occupant) || ' ';

        rowStr =+ `${symbol}`;
      }
      output += rowStr + '\n';
    }
    output += hSeparator;
    return output;
  }
}

module.exports = TicTacToeView;