/* 
  #TODO: Product List Component
    - [x] Sort Form
    - [x] List of Product Item
    - [x] Loading
    - [ ] Infinite Scroll
    - [ ] End of Products Text
*/

import React, { useEffect, useReducer } from 'react';
import { Loading } from '../Loading/Loading';
import { SortForm } from '../SortForm/SortForm';
import { ProductItem } from '../ProductItem/ProductItem';
import { ProductsReducer, InitalState } from '../../reducer';
import { 
  SetLoading, 
  PushProducts 
} from '../../constants';

import './ProductList.css';

const ProductList = () => {
  const [state, dispatch] = useReducer(ProductsReducer, InitalState);
  const { loading, pageIndex, pageLimit, sortBy, items: products } = state;

  const fetchProducts = async() => {
    dispatch({ type: SetLoading })
    const response = await fetch(`http://localhost:3000/api/products?_page=${pageIndex}&_limit=${pageLimit}&_sort=${sortBy}`);
    const items = await response.json();
    dispatch({ type: PushProducts, payload: { items } })
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