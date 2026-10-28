import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

const fetchProducts = async () => {
  const { data } = await axios.get('https://dummyjson.com/products');
  return data.products;
};

export default function ProductList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ката кетти: {error.message}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{fontSize:'40px', textAlign: 'center'}}>Каталог товаров</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {data.map((product) => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <img src={product.thumbnail} alt={product.title} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <h3>{product.title}</h3>
            <p>Цена: ${product.price}</p>
            <Link to={`/products/${product.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
          Подробнее            
           </Link>
          </div>
        ))}
      </div>
    </div>
  );
}