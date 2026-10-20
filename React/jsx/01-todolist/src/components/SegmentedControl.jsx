import React from "react";

export class SegmentedControl extends React.Component{
  render(){
    const {
      labels,
      selectedIndex = 0,
      onChange,
    } = this.props;
 
    return(
      <nav className="segmented-control">
        {labels.map((label, index)=>{
          const isSelected = selectedIndex === index;

          const className = `segmented-control__segment${
            isSelected
            ?' segmented-control__segment--selected'
            :''
          }`;

          return(
            <span
              key = {index}
              className = {className}
              onClick={onChange}
            >{label}</span>
          )
        })}
      </nav>
    )
  }
}