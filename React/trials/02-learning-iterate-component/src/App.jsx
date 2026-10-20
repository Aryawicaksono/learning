import React from "react";

import { ProfileCard } from "./components/ProfileCard";
import { employee} from "./assets/employee";

import './scss/main.scss';

export class App extends React.Component{
  render(){
    return(
    <div className="app">
      <div className="profile-list">
        {employee.map((e, index) => (
          <ProfileCard
          key = {index}
          name = {e.name}
          job = {e.job}
          salary = {e.salary}
          isRetired = {e.isRetired}
          />
        ))}
      </div>
    </div>
    )
  }
}