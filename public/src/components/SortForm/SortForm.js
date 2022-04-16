import React, { useContext } from 'react';
import { SortOptions, ChangeSortBy } from '../../constants';
import { ProductsContext } from '../../context';
import './SortForm.css';

const SortForm = () => {
  const { dispatch } = useContext(ProductsContext);

  const handleChange = (e) => {
    const sortBy = e.target.value;
    dispatch({ type: ChangeSortBy, payload: { sortBy } });
  }

  return (
    <div className="form-wrapper">
      Sort by: 
      <select onChange={handleChange}>
        {SortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

export { SortForm };