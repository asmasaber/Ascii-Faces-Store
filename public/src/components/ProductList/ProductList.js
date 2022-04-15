/* 
  #TODO: Product List Component
    - [x] Sort Form
    - [ ] List of Product Item
    - [ ] Loading
    - [ ] Infinite Scroll
    - [ ] End of Products Text
*/

import React, { useState, useEffect } from 'react';
import { Loading } from '../Loading/Loading';
import { SortForm } from '../SortForm/SortForm';
import { ProductItem } from '../ProductItem/ProductItem';

import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async() => {
    setLoading(true);
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    setLoading(false);
    setProducts(products);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {loading && <Loading />}
      <SortForm />
      <div className="row">
        {products.map((p) => 
          <div className="column" key={p.id}>
            <ProductItem product={p}/>
          </div>
        )}
      </div>
    </>
  );
}

export { ProductList };