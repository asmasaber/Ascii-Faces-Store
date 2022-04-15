/* 
  #TODO: Product List Component
    - [x] Sort Form
    - [x] List of Product Item
    - [x] Loading
    - [x] Infinite Scroll
    - [x] pre-emptively fetch the next batch
    - [x] End of Products Text
    - [ ] check the performance
    - [ ] Reveiew & Enhancmment
    - [ ] Error catch
    - [ ] handle no data found
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
  ChangeSortBy,
  SetPreFetchedItems,
  SetPreFetching,
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
    items: products,
    preFetchedItems,
    preFetching,
  } = state;

  const fetchProducts = async(page = pageIndex) => {
    const response = await fetch(`http://localhost:3000/api/products?_page=${page}&_limit=${pageLimit}&_sort=${sortBy}`);
    const items = await response.json();
    if(items.length < pageLimit) {
      dispatch({ type: SetHasMore, payload: { hasMore: false, loading: false }});
    }
    return items;
  }

  const loadCurrentWindow = async () => {
    dispatch({ type: SetLoading });
    if(preFetchedItems && preFetchedItems.length) {
      dispatch({ type: PushProducts, payload: { items: preFetchedItems } });
      dispatch({ type: SetPreFetchedItems, payload: { items: [] } });
    } else {
      const items = await fetchProducts();
      dispatch({ type: PushProducts, payload: { items } })
    }
    preFetchNextWindow();
  }

  const preFetchNextWindow = async () => {
    dispatch({ type: SetPreFetching,  payload: { preFetch: true } });
    const items = await fetchProducts(pageIndex + 1);
    dispatch({ type: SetPreFetchedItems, payload: { items } });
    
    const endOfPage =  Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight;
    if (endOfPage && hasMore) {
      dispatch({ type: IncrementPageIndex }) ;
    }
  }

  const handleSortChange = (sortBy) => {
    dispatch({ type: ChangeSortBy, payload: { sortBy } });
  }

  const infiniteScroll = () => {
    if (hasMore && !loading && Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight){
      if(!preFetching) {
        dispatch({ type: IncrementPageIndex });
      } else {
        dispatch({ type: SetLoading });
      }
    }
  }

  useEffect(() => {
    hasMore && loadCurrentWindow();
  }, [pageIndex, sortBy, hasMore]);


  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [hasMore, preFetching]);

  return (
    <>
      {(loading) && <Loading />}
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