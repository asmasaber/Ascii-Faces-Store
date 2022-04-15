import {
  DefaultSortOption,
  SetLoading,
  SetError,
  PushProducts,
  ChangeSortBy,
  IncrementPageIndex,
  SetHasMore
} from './constants';

const InitalState = {
  loading: false,
  error: null,
  items: [],
  sortBy: DefaultSortOption,
  pageLimit: 16,
  pageIndex: 1,
  hasMore: true
};

const ProductsReducer = (state, action) => {
  switch(action.type) {
    case SetLoading: 
      return {
        ...state,
        loading: true,
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
      }
    case ChangeSortBy: 
      return {
        ...state,
        items: [],
        sortBy: action.payload.sortBy,
        pageIndex: 1,
      }
    case IncrementPageIndex: 
      return {
        ...state,
        pageIndex: state.pageIndex + 1,
      }
    case SetHasMore: 
      return {
        ...state,
        hasMore: action.payload.hasMore,
      }
    default:
      return state;
  }
};

export { 
  InitalState, 
  ProductsReducer 
};