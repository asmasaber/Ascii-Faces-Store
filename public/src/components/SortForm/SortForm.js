/* 
  #TODO: Sort Form Component
    - [x] Select Field
*/

import React from 'react';
import { useId } from "react";
import PropTypes from 'prop-types';
import { SortOptions } from '../../constants';

import './SortForm.css';

const SortForm = ({ onChange }) => {
  const randomID = useId();

  return (
    <div className="form-wrapper">
      Sort by: 
      <select onChange={(e) => onChange(e.target.value)}>
        {SortOptions.map((o) => <option key={`${randomID}-${o.value}`} value={o.value}>{o.label}</option>)}
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