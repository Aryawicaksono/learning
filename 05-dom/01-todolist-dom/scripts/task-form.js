export class TaskForm {
  element;
  onClickedAddButton;

  _textInput;
  _addButton;

  constructor(element){
    this.element = element;
    this._textInput = this.element.getElementsByClassName('task-input__field')[0];
    this._addButton = this.element.getElementsByClassName('btn')[0];

    this._updateAddButtonAppearance();
    this._addEventListener();
  }

  setValue(value){
    this._textInput.value = value;
  }

  _addEventListener(){
    this._textInput.addEventListener('input', (event)=>{
      this._updateAddButtonAppearance();
    });

    this._addButton.addEventListener('click', ()=>{
      if(typeof this.onClickedAddButton === 'function'){
        this.onClickedAddButton(this._textInput.value);
      }
    })
  }

  _updateAddButtonAppearance(){
    const text = this._textInput.value;

    if (text.length === 0) {
          this._addButton.classList.add('btn--disabled');
        } else {
          this._addButton.classList.remove('btn--disabled');
        }
  }
}