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
import PropTypes from 'prop-types';
import { Loading } from '../Loading/Loading';
import { ProductItem } from '../ProductItem/ProductItem';
import { ErrorPlaceholder } from '../ErrorPlaceholder/ErrorPlaceholder';
import { ProductsReducer, InitalState } from '../../reducer';
import {
  SetLoading,
  PushProducts,
  IncrementPageIndex,
  SetNoMoreData,
  ChangeSortBy,
  SetPreFetchedItems,
  SetPreFetching,
  SetError,
  BaseURL,
  PushPrefetchedProducts,
} from '../../constants';
import './ProductList.css';

const ProductList = ({ selectedSortBy }) => {
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
    pushDone,
  } = state;

  const handleSortChange = (sortBy) => {
    dispatch({ type: ChangeSortBy, payload: { sortBy } });
  }

  const fetchProducts = async (page = pageIndex) => {
    const response = await fetch(`${BaseURL}/products?_page=${page}&_limit=${pageLimit}&_sort=${sortBy}`);
    const items = await response.json();
    if (items.length < pageLimit) {
      dispatch({ type: SetNoMoreData });
    } 
    return items;
  }

  const loadCurrentWindow = async () => {
    if (preFetchedItems && preFetchedItems.length) {
      dispatch({ type: PushPrefetchedProducts });
    } else {
      dispatch({ type: SetLoading });
      const items = await fetchProducts();
      dispatch({ type: PushProducts, payload: { items } })
    }
  }

  const preFetchNextWindow = async () => {
    dispatch({ type: SetPreFetching });
    const items = await fetchProducts(pageIndex + 1);
    dispatch({ type: SetPreFetchedItems, payload: { items } });

    const endOfPage = Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight;
    if (endOfPage && hasMore) {
      dispatch({ type: IncrementPageIndex });
    }
  }
  
  const infiniteScroll = () => {
    const endOfPage = Math.ceil(window.innerHeight + document.documentElement.scrollTop) === document.documentElement.offsetHeight;
    if (endOfPage && hasMore) {
      if (!preFetching) {
        dispatch({ type: IncrementPageIndex });
      } else {
        dispatch({ type: SetLoading });
      }
    }
  }

  useEffect(() => {
    const canPrefetch = !preFetchedItems.length && !preFetching && hasMore && pushDone;
    canPrefetch &&
      preFetchNextWindow();
  }, [pushDone, hasMore, preFetchedItems]);

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

  useEffect(() => {
    dispatch({ type: ChangeSortBy, payload: { sortBy: selectedSortBy } });
  }, [selectedSortBy]);

  return (
    <>
      {(loading) && <Loading />}
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
};


ProductList.propTypes = {
  selectedSortBy: PropTypes.string.isRequired,
};

export { ProductList };