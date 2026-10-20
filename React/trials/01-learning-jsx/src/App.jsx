import React from "react";

import { ProductCard } from "./components/ProductCard";

export class App extends React.Component{
  render(){
    return(
    <div className="app">
      <div className="product-list">
        <ProductCard
        name = 'Mie Goreng'
        price = {12000}
        />
        <ProductCard
        name = 'Mie Ayam'
        price = {8000}
        isSoldOut
        />
        <ProductCard
        name = 'Nasi Goreng Gila'
        price = {18000}
        />
      </div>
    </div>
    )
  }
}