// ProductList.tsx
'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './_components/page';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


interface Product {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<Product[]>('http://0.0.0.0:8888/products/all');
      setProducts(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      {/* <h1>Product List</h1>
      {products.map(product => (
        <ProductCard key={product._id} product={product} />
      ))} */}

      
       <div className='flex flex-col items-center justify-center  border w-fit'>
          <h1>Product Name :- <span>DEMO</span></h1>
          <h2>Product Price :- <span>6000</span></h2>
          <h3>Product Quantity :- <span>100</span></h3>
       </div>
      
    </div>
  );
}

export default ProductList;
