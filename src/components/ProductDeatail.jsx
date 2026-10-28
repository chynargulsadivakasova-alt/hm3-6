import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchProductById = async ({ queryKey }) => {
  const [, id] = queryKey;
  const { data } = await axios.get(`https://dummyjson.com/products/${id}`);
  return data;
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['product', id],
    queryFn: fetchProductById,
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>Ката кетти: {error.message}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: '20px', padding: '8px 16px' }}>
        ← Назад
      </button>

      <div>
        <h1>{data.title}</h1>
        <img src={data.thumbnail} alt={data.title} style={{ maxWidth: '300px' }} />
        <p><strong>Сүрөттөмөсү:</strong> {data.description}</p>
        <p><strong>Баасы:</strong> ${data.price}</p>
        <p><strong>Рейтинг:</strong> {data.rating} ⭐</p>
      </div>
    </div>
  );
}