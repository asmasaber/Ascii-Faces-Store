/* 
  #TODO: Product List Component
    - [x] Sort Form
    - [ ] List of Product Item
    - [ ] Loading
    - [ ] Infinite Scroll
    - [ ] End of Products Text
*/

import React from 'react';
import { SortForm } from '../SortForm/SortForm';
import './ProductList.css';

const ProductList = () => {
  return (
    <>
      <SortForm />
      <h1>Product List</h1>
    </>
  );
}

export { ProductList };