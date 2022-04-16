import React, { useState } from 'react';
import { ProductList } from '../ProductList/ProductList';
import { SortForm } from '../SortForm/SortForm';
import { DefaultSortOption } from '../../constants';
import './App.css';

const App = () => {
  const [sortBy, setSortBy] = useState(DefaultSortOption);
  
  return (
    <div className="container">
      <div className="header">
        <h1 >Ascii Faces</h1>
        <p>This is an ecommerce site, where you can buy all sorts of ascii faces like `(ノ・∀・)ノ` and `¯_(ツ)_/¯`, in a wide variety of font sizes.</p>
      </div>
      <SortForm onChange={(value) => setSortBy(value)}/>
      <ProductList selectedSortBy={sortBy}/>
    </div>
  );
}

export { App };