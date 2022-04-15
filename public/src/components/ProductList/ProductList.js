/* 
  #TODO: Product List Component
    - [x] Sort Form
    - [x] List of Product Item
    - [x] Loading
    - [x] Infinite Scroll
    - [ ] pre-emptively fetch the next batch
    - [x] End of Products Text
*/

import React, { useEffect, useReducer } from 'react';
import { Loading } from '../Loading/Loading';
import { SortForm } from '../SortForm/SortForm';
import { ProductItem } from '../ProductItem/ProductItem';
import { ProductsReducer, InitalState } from '../../reducer';
import { 
  SetLoading, 
  PushProducts,
  IncrementPageIndex,
  SetHasMore,
  ChangeSortBy
} from '../../constants';

import './ProductList.css';

const ProductList = () => {
  const [state, dispatch] = useReducer(ProductsReducer, InitalState);
  const { 
    loading, 
    pageIndex, 
    pageLimit, 
    sortBy , 
    hasMore, 
    items: products 
  } = state;

  const fetchProducts = async() => {
    dispatch({ type: SetLoading })
    const response = await fetch(`http://localhost:3000/api/products?_page=${pageIndex}&_limit=${pageLimit}&_sort=${sortBy}`);
    const items = await response.json();
    if(items.length < pageLimit) {
      dispatch({ type: SetHasMore, payload: { hasMore: false }});
    }
    dispatch({ type: PushProducts, payload: { items } })
  }

  const handleSortChange = (sortBy) => {
    dispatch({ type: ChangeSortBy, payload: { sortBy } });
  }

  const infiniteScroll = () => {
    if (hasMore && !loading && Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight){
      dispatch({ type: IncrementPageIndex })
    }
  }

  useEffect(() => {
    fetchProducts();
  }, [pageIndex, sortBy]);

  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [hasMore]);

  return (
    <>
      {loading && <Loading />}
      <SortForm onChange={handleSortChange}/>
      <div className="row">
        {products.map((p) => 
          <div className="column" key={p.id}>
            <ProductItem product={p}/>
          </div>
        )}
      </div>
      {!hasMore && <div className="end">~ end of catalogue ~</div>}
    </>
  );
}

export { ProductList };