const SortOptions = [
  {label: 'Size', value: 'size'},
  {label: 'Price', value: 'price'},
  {label: 'ID', value: 'id'},
];
const DefaultSortOption = SortOptions[0].value;

const SetLoading = 'SET_LOADING';
const SetError = 'SET_ERROR';
const PushProducts = 'PUSH_PRODUCTS';
const ChangeSortBy = 'CHANGE_SORT_BY';
const IncrementPageIndex = 'INCREMENT_PAGE_INDEX';
const SetHasMore = 'SET_HAS_MORE';

export {
  SortOptions,
  DefaultSortOption,
  SetLoading,
  SetError,
  PushProducts,
  ChangeSortBy,
  IncrementPageIndex,
  SetHasMore
};
