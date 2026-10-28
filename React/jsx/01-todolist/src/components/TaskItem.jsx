import React from "react";

export class TaskItem extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      editLabel: this.props.label,
    };
  }

  handleStartedit = () => {
    this.setState({
      isEditing:true,
      editLabel: this.props.label,
    });
  }

  handleCancelEdit = () => {
    this.setState({
      isEditing:false,
    });
  }

  handleInputChange = (e) => {
    this.setState({
      editLabel: e.target.value,
    });
  }

  handleSaveEdit = () => {
    const {editLabel} = this.state;
    if (!editLabel.trim()) return;

    if (this.props.onEdit) {
      this.props.onEdit(editLabel);
    }

    this.setState({isEditing:false});
  }
  render(){
    const {isChecked, label, onChange, onDelete} = this.props;

    const {isEditing, editLabel} = this.state;

    const itemClass = isChecked
    ?"task-item task-item--checked"
    : "task-item";
    const checkboxClass = isChecked
    ?"checkbox checkbox--checked"
    : "checkbox";

    return(
    <li className = {itemClass} >
        <button 
        className={checkboxClass}
        onClick={isEditing? undefined : onChange}
        style={{cursor: isEditing? 'not-allowed' : 'pointer'}}
        ></button>
      <div 
        className="task-item__body"
        style={{display: isEditing? 'none' : 'flex'}}
      >
        <div 
        className="task-item__content"
        onClick={onChange}
        >
          <p className="task-item__label">{label}</p>
        </div>
        <div className="task-item__actions">
          <button 
            className="task-item__action task-item__action--edit"
            onClick={this.handleStartedit}
          >
            <img src="./src/assets/img/icon-sqr-pen.svg" alt="Icon square pen" />
          </button>
          <button 
            className ="task-item__action task-item__action--delete"
            onClick={onDelete}
            >
            <img src="./src/assets/img/icon-trash.svg" alt="Icon trash" />
          </button>
        </div>
      </div>
      <div 
        className="task-item__form"
        style={{display: isEditing? 'flex' : 'none'}}
        >
        <input 
        type="text" 
        className="task-item__input-field"
        value={editLabel}
        onChange={this.handleInputChange}
        />
        <div className="task-item__form-actions">
          <button 
            className="task-item__form-action"
            onClick={this.handleSaveEdit}
            >
            <img src="./src/assets/img/icon-check-green.svg" alt="Icon check green" />
          </button>
          <button 
            className="task-item__form-action"
            onClick={this.handleCancelEdit}
            >
            <img src="./src/assets/img/icon-x.svg" alt="Icon x" />
          </button>
        </div>
      </div>
    </li>
    )
  }
}