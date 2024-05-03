'use client'
// ProductCard.tsx
import React from 'react';
import axios from 'axios';

interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const handleUpdate = () => {
    // Implement update functionality
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/products/${product._id}`);
      // Update state or re-fetch products after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product-card">
      <h2>{product.name}</h2>
      <p>Price: {product.price}</p>
      <p>Quantity: {product.quantity}</p>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ProductCard;
