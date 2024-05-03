'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductDetails({ productId }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updatedPrice, setUpdatedPrice] = useState('');
    const [updatedQuantity, setUpdatedQuantity] = useState('');

    useEffect(() => {
        const fetchProductDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get(`/products/${productId}`);
                setProduct(response.data);
                setUpdatedPrice(response.data.price.toString());
                setUpdatedQuantity(response.data.quantity.toString());
            } catch (error) {
            //    setProduct('');
               setUpdatedPrice('5');
               setUpdatedQuantity('2');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    const handleUpdateProduct = async () => {
        try {
            const response = await axios.put(`/products/${productId}`, {
                price: parseFloat(updatedPrice),
                quantity: parseInt(updatedQuantity)
            });
            if (response.status === 200) {
                alert('Product updated successfully!');
                // Refresh product details
                fetchProductDetails();
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Failed to update product. Please try again.');
        }
    };

    const handleDeleteProduct = async () => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await axios.delete(`/products/${productId}`);
                if (response.status === 200) {
                    alert('Product deleted successfully!');
                    // Redirect or perform any other action after deletion
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
            <p>
                Price: $
                <input
                    type="text"
                    value={updatedPrice}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                />
            </p>
            <p>
                Quantity: 
                <input
                    type="text"
                    value={updatedQuantity}
                    onChange={(e) => setUpdatedQuantity(e.target.value)}
                />
            </p>
            <button onClick={handleUpdateProduct}>Update Product</button>
            <button onClick={handleDeleteProduct}>Delete Product</button>
        </div>
    );
}

export default ProductDetails;
