import React from "react";
import { Badge } from "./Badge";

export class ProfileCard extends React.Component{
  render(){
    return(
      <div className="profile-card">
        <div className="profile-card__content">
          <h3 className="profile-card__name">{this.props.name}</h3>
          <p className="profile-card__job">{this.props.job}</p>
        </div>
        <div className="profile-card__status">
          <p className="profile-card__salary">Rp {this.props.salary.toLocaleString('id-ID')}</p>
          {this.props.isRetired && <Badge>Retired</Badge>}
        </div>
      </div>
    )
  }
}