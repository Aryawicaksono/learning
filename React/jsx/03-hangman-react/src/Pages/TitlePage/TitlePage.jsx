import React from "react";
import styles from './TitlePage.module.css';

import { Button } from "../../components/Button";
import hangmanLogo from "@assets/images/Logo-hangman.svg";

/**
 * @typedef {Object} TitlePageProps
 * @prop {()=>void} onChangePage
 */

/**
 * @extends {React.Component<TitlePageProps>}
 */
export class TitlePage extends React.Component{
  handleChangepage = () => {
    if (this.props.onChangePage){
      this.props.onChangePage();
    }
  }
  render(){
    <div className={styles.titlePage}>
      <h1 className={styles.title}> Selamat Datang di Game HangMan</h1>
      <img src={hangmanLogo} alt="Logo hangman"/>
      <Button
      classNames={}
      >

      </Button>
    </div>
  }
}