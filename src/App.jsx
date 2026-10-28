import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList'; 
import ProductDetail from './components/ProductDeatail'; 

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetail />} />
    </Routes>
  );
}