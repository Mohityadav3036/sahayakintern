'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductDetails({ productId}) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`/products/${productId}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Error fetching product details:', error);
                setError('Failed to fetch product details');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleUpdateProduct = () => {
        // Redirect or display update form with prefilled values
    };

    const handleDeleteProduct = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await axios.delete(`/products/${productId}`);
                if (response.status === 200) {
                    alert('Product deleted successfully!');
                    // Redirect or do something after deletion
                }
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('Failed to delete product. Please try again.');
            }
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!product) return null;

    return (
        <div>
            <h2>Product Details</h2>
            <p>Product ID: {product.productId}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <button onClick={handleUpdateProduct}>Update Product</button>
            <button onClick={handleDeleteProduct}>Delete Product</button>
        </div>
    );
}

export default ProductDetails;
