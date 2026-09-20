export class StatWidget{
  element;
  _valueLabel;
  _count = 0;


  constructor(element){
    this.element = element;
    this._valueLabel = this.element.getElementsByClassName('stat-widget__value')[0];

    this._render();
  }

  setCount(count){
    this._count = count;
    this._render();
  }

  _render(){
    this._valueLabel.textContent = String(this._count);
  }
}