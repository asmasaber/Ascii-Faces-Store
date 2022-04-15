/* 
  #TODO: Product Item Component
    - [x] Card
    - [x] Format relative time 
    - [x] Format Price
*/

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import './ProductItem.css';

const ProductItem = ({ product }) => {
  const time = useMemo(() => {
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerWeek = msPerDay * 7;

    var elapsed =  +new Date() - +new Date(product.date)
    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' seconds';
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' minutes';
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' hours';
    } else if (elapsed < msPerWeek) {
      return Math.round(elapsed / msPerDay) + ' day';
    } else {
      return new Date(product.date).toLocaleDateString();
    }
  });

  return (
    <div className="card">
      <div className="badge">${product.price.toFixed(2)}</div>
      <div className="content" style={{ fontSize: product.size }}>{product.face}</div>
      <div className="details">
        <span>since:</span> {time}
      </div>
    </div>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string,
    size: PropTypes.number,
    price: PropTypes.number,
    date: PropTypes.date
  }).isRequired,
};

export { ProductItem };