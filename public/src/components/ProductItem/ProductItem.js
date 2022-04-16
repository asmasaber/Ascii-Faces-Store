import React from 'react';
import PropTypes from 'prop-types';
import { RelativeTime } from '../RelativeTime/RelativeTime';
import './ProductItem.css';

const ProductItem = ({ product }) => {
  return (
    <div className="card">
      <div className="badge">${product.price.toFixed(2)}</div>
      <div className="content" style={{ fontSize: product.size }}>{product.face}</div>
      <div className="details">
        <RelativeTime date={product.date}/>
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