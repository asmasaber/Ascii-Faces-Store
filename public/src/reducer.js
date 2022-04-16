import {
  DefaultSortOption,
  SetLoading,
  SetError,
  PushProducts,
  ChangeSortBy,
  IncrementPageIndex,
  SetNoMoreData,
  SetPreFetchedItems,
  SetPreFetching,
  PushPrefetchedProducts,
} from './constants';

const InitalState = {
  loading: false,
  error: null,
  items: [],
  sortBy: DefaultSortOption,
  pageLimit: 50,
  pageIndex: 1,
  hasMore: true,
  preFetchedItems: [],
  preFetching: false,
  pushDone: false,
};

const ProductsReducer = (state, action) => {
  switch(action.type) {
    case SetLoading: 
      return {
        ...state,
        loading: true,
        pushDone: false,
      }
    case SetError: 
      return {
        ...state,
        loading: false,
        error: action.payload.error,
      }
    case PushProducts:
      return {
        ...state,
        items: [...state.items, ...action.payload.items],
        loading: false,
        pushDone: true,
      }
    case PushPrefetchedProducts:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...state.preFetchedItems],
        preFetchedItems: [],
        pushDone: true,
        preFetching: false,
      }
    case ChangeSortBy: 
      return {
        ...state,
        items: [],
        preFetchedItems: [],
        sortBy: action.payload.sortBy,
        pageIndex: 1,
        hasMore: true,
        pushDone: false,
      }
    case IncrementPageIndex: 
      return {
        ...state,
        pageIndex: state.pageIndex + 1,
      }
    case SetNoMoreData: 
      return {
        ...state,
        hasMore: false,
        loading: false,
      }
    case SetPreFetching: {
      return {
        ...state,
        preFetching: true,
      }
    }
    case SetPreFetchedItems: 
      return {
        ...state,
        preFetchedItems: action.payload.items,
        preFetching: false,
        loading: false,
      }
    default:
      return state;
  }
};

export { 
  InitalState, 
  ProductsReducer,
};