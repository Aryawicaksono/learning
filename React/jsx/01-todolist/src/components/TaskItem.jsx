import React from "react";

export class TaskItem extends React.Component{
  render(){
    const {isChecked, label} = this.props;

    const itemClass = isChecked
    ?"task-item task-item--checked"
    : "task-item";
    const checkboxClass = isChecked
    ?"checkbox checkbox--checked"
    : "checkbox";

    return(
    <li className = {itemClass} >
      <div className="task-item__content">
        <button className={checkboxClass}></button>
        <p className="task-item__label">{label}</p>
      </div>
      <div className="task-item__actions">
        <button className="task-item__action task-item__action--edit">
          <img src="./src/assets/img/icon-sqr-pen.svg" alt="Icon square pen" />
        </button>
        <button className="task-item__action task-item__action--delete">
          <img src="./src/assets/img/icon-trash.svg" alt="Icon trash" />
        </button>
      </div>
    </li>
    )
  }
}