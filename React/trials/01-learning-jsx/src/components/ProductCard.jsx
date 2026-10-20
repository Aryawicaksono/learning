import React from "react";

import { Badge } from "./Badge";

export class ProductCard extends React.Component{
  render(){
    return(
    <div className="product-card">
      <h3 className="product-card__label">{this.props.name}</h3>
      <p className="product-card__price">Rp {this.props.price.toLocaleString('id-ID')}</p>
      {this.props.isSoldOut && <Badge>Sold Out</Badge>}
    </div>
    )
  }
}