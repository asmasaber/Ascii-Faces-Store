import React from 'react';
import PropTypes from 'prop-types';
import { SortOptions } from '../../constants';
import './SortForm.css';

const SortForm = ({ onChange }) => {
  return (
    <div className="form-wrapper">
      Sort by: 
      <select onChange={(e) => onChange(e.target.value)}>
        {SortOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}

SortForm.prototype = {
  onChange: PropTypes.func.isRequired,
};

SortForm.defaultProps = {
  onChange: () => ({}),
};

export { SortForm };