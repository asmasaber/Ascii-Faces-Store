import React from 'react';
import { ProductList } from '../ProductList/ProductList';
import './App.css';

const App = () => {
  /* 
    #TODO: App Component
      - [x] Header
      - [x] Product List
  */
  return (
    <div className="container">
      <div className="header">
        <h1 >Ascii Faces</h1>
        <p>This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes.</p>
      </div>
      <ProductList />
    </div>
  );
}

export { App };