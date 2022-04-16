import React from 'react';
import { ProductsProvider } from '../ProductsProvider/ProductsProvider';
import { ProductList } from '../ProductList/ProductList';
import { SortForm } from '../SortForm/SortForm';
import './App.css';


const App = () => {
  return (
    <div className="container">
      <div className="header">
        <h1 >Ascii Faces</h1>
        <p>This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes.</p>
      </div>
      <ProductsProvider>
        <SortForm />
        <ProductList />
      </ProductsProvider>
    </div>
  );
}

export { App };