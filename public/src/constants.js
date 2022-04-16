const SortOptions = [
  {label: 'Size', value: 'size'},
  {label: 'Price', value: 'price'},
  {label: 'ID', value: 'id'},
];
const DefaultSortOption = SortOptions[0].value;
const BaseURL = 'http://localhost:3000/api';

const SetLoading = 'SET_LOADING';
const SetError = 'SET_ERROR';
const PushProducts = 'PUSH_PRODUCTS';
const ChangeSortBy = 'CHANGE_SORT_BY';
const IncrementPageIndex = 'INCREMENT_PAGE_INDEX';
const SetNoMoreData = 'SET_HAS_MORE';
const SetPreFetchedItems = 'SET_PREFETCHED_ITEMS';
const SetPreFetching = 'SET_PREFETCHING';
const PushPrefetchedProducts = 'PUSH_PREFETCHED_PRODUCTS';

export {
  SortOptions,
  DefaultSortOption,
  SetLoading,
  SetError,
  PushProducts,
  ChangeSortBy,
  IncrementPageIndex,
  SetNoMoreData,
  SetPreFetchedItems,
  SetPreFetching,
  BaseURL,
  PushPrefetchedProducts,
};
