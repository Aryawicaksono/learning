import React from "react";

import styles from './NoTasks.module.css';

export class NoTasks extends React.Component{
  render(){
    return(
      <div className={styles.noTasks}>
        <img src="./src/assets/img/icon-layout-box.svg" alt="Icon layout box" />
        <div className={styles.content}>
          <p className={styles.title}>
            No Tasks yet
          </p>
          <p className={styles.desc}>
            Add your first task above to get started. Stay productive!
          </p>
        </div>
      </div>
    )
  }
}