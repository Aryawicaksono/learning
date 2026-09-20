export class TaskForm {
  element;
  onClickedButton;

  _textInput;
  _addButton;

  constructor(element){
    this.element = element;
    this._textInput = this.element.getElementsByClassName('task-input__field')[0];
    this._addButton = this.element.getElementsByClassName('btn')[0];

    this._addEventListener();
  }

  setValue(value){
    this._textInput.value = value;
  }

  _addEventListener(){
    this._addButton.addEventListener('click', ()=>{
      if(typeof this.onClickedButton === 'function'){
        this.onClickedButton(this._textInput.value);
      }
    })
  }
}