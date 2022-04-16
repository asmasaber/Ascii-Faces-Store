import React from 'react';
import PropTypes from 'prop-types';

import './ErrorPlaceholder.css';

const ErrorPlaceholder = ({ error }) => {
  return (
    <div className="errorWrapper">
      <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
      <strong>{error || 'Something went wrong.'}</strong>
    </div>
  );
}

ErrorPlaceholder.prototype = {
  error: PropTypes.string
};

export { ErrorPlaceholder };