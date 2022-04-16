import React, { useReducer } from 'react';
import { ProductsReducer, InitalState } from '../../reducer';
import { ProductsContext } from '../../context';

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductsReducer, InitalState);
  
  return (
    <ProductsContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsProvider };