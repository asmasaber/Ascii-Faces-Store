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
    - [x] Error catch
    - [x] handle no data found
*/

import React, { useEffect, useReducer } from 'react';
import { Loading } from '../Loading/Loading';
import { SortForm } from '../SortForm/SortForm';
import { ProductItem } from '../ProductItem/ProductItem';
import { ErrorPlaceholder } from '../ErrorPlaceholder/ErrorPlaceholder';

import { ProductsReducer, InitalState } from '../../reducer';
import {
  SetLoading,
  PushProducts,
  IncrementPageIndex,
  SetHasMore,
  ChangeSortBy,
  SetPreFetchedItems,
  SetPreFetching,
  SetError,
} from '../../constants';

import './ProductList.css';

const ProductList = () => {
  const [state, dispatch] = useReducer(ProductsReducer, InitalState);
  const {
    loading,
    pageIndex,
    pageLimit,
    sortBy,
    hasMore,
    items: products,
    preFetchedItems,
    preFetching,
    error,
  } = state;

  const fetchProducts = async (page = pageIndex) => {
    const response = await fetch(`http://localhost:3000/api/products?_page=${page}&_limit=${pageLimit}&_sort=${sortBy}`);
    const items = await response.json();
    if (items.length < pageLimit) {
      dispatch({ type: SetHasMore, payload: { hasMore: false, loading: false } });
    } 
    return items;
  }

  const loadCurrentWindow = async () => {
    dispatch({ type: SetLoading });
    let items;
    if (preFetchedItems && preFetchedItems.length) {
      dispatch({ type: PushProducts, payload: { items: preFetchedItems } });
      dispatch({ type: SetPreFetchedItems, payload: { items: [] } });
    } else {
      items = await fetchProducts();
      dispatch({ type: PushProducts, payload: { items } })
    }
    items && items.length && preFetchNextWindow();
  }

  const preFetchNextWindow = async () => {
    dispatch({ type: SetPreFetching, payload: { preFetch: true } });
    const items = await fetchProducts(pageIndex + 1);
    dispatch({ type: SetPreFetchedItems, payload: { items } });

    const endOfPage = Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight;
    if (endOfPage && hasMore) {
      dispatch({ type: IncrementPageIndex });
    }
  }

  const handleSortChange = (sortBy) => {
    dispatch({ type: ChangeSortBy, payload: { sortBy } });
  }

  const infiniteScroll = () => {
    if (hasMore && !loading && Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight) {
      if (!preFetching) {
        dispatch({ type: IncrementPageIndex });
      } else {
        dispatch({ type: SetLoading });
      }
    }
  }

  useEffect(() => {
    hasMore &&
      loadCurrentWindow()
        .catch((error) => {
          dispatch({ type: SetError, payload: { error: error.message } });
        });
  }, [pageIndex, sortBy, hasMore]);


  useEffect(() => {
    window.addEventListener('scroll', infiniteScroll);
    return () => window.removeEventListener('scroll', infiniteScroll);
  }, [hasMore, preFetching]);

  return (
    <>
      {(loading) && <Loading />}
      <SortForm onChange={handleSortChange} />
      {
        error ? 
        <ErrorPlaceholder error={error}>{error}</ErrorPlaceholder> :
        <div className="row">
          {products.map((p) =>
            <div className="column" key={p.id}>
              <ProductItem product={p} />
            </div>
          )}
        </div>
      }
      {!hasMore && !!products.length && <div className="end">~ end of catalogue ~</div>}
      {!hasMore && !products.length && <div className="end">~ NO Data Found ~</div>}
    </>
  );
}

export { ProductList };