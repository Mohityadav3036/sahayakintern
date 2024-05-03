// import React from 'react'

// function page() {
//   return (
//     <div className="flex min-h-screen flex-col items-center justify-between p-24">
//       <h1>This is a create Page...</h1>
//     </div>
//   )
// }

// export default page

// import React, { useState } from 'react';

// function ProductForm() {
//     const [productName, setProductName] = useState('');
//     const [productPrice, setProductPrice] = useState('');
//     const [productQuantity, setProductQuantity] = useState('');

//     const handleInputChange = (event) => {
//         const { name, value } = event.target;
//         switch (name) {
//             case 'name':
//                 setProductName(value);
//                 break;
//             case 'price':
//                 setProductPrice(value);
//                 break;
//             case 'quantity':
//                 setProductQuantity(value);
//                 break;
//             default:
//                 break;
//         }
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         try {
//             const response = await fetch('/api/products', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     name: productName,
//                     price: parseFloat(productPrice),
//                     quantity: parseInt(productQuantity),
//                 }),
//             });
//             if (response.ok) {
//                 alert('Product saved successfully!');
//                 // Optionally, clear the input fields after successful submission
//                 setProductName('');
//                 setProductPrice('');
//                 setProductQuantity('');
//             } else {
//                 console.error('Failed to save product:', response.statusText);
//                 alert('Failed to save product. Please try again.');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             alert('An error occurred. Please try again later.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Product Name:
//                 <input type="text" name="name" value={productName} onChange={handleInputChange} />
//             </label>
//             <label>
//                 Price:
//                 <input type="number" name="price" value={productPrice} onChange={handleInputChange} />
//             </label>
//             <label>
//                 Quantity:
//                 <input type="number" name="quantity" value={productQuantity} onChange={handleInputChange} />
//             </label>
//             <button type="submit">Save Product</button>
//         </form>
//     );
// }

// export default ProductForm;
'use client'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';
import axios from 'axios';

function ProductForm() {
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
              try {
                const response = await axios.post('/products/create', {
                    name: productName,
                    price: parseFloat(productPrice),
                    quantity: parseInt(productQuantity),
                    
                });
                console.log("success"); 
              } catch (error) {
                console.log("error....2345")
              }
            const response = await axios.post('/products/create', {
                name: productName,
                price: parseFloat(productPrice),
                quantity: parseInt(productQuantity),
            });
            if (response.status === 200) {
                console.log("one");
                alert('Product saved successfully!');
                // Optionally, clear the input fields after successful submission
                setProductId('');
                setProductName('');
                setProductPrice('');
                setProductQuantity('');
            } else {
                console.error('Failed to save product:', response.statusText);
                alert('Failed to save product. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };
    return (

        
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4 shadow-lg shadow-white">
            <div className="flex min-h-screen flex-col  items-center  p-24 ">
                <h1 className='text-5xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent mb-[50px]'>Create New Product</h1>
                <div className=' bg-slate- flex flex-col'>
                <div className='mb-4'>
                        <label>
                            Product ID:
                            <input
                                type="text"
                                name="id"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                className="cursor-pointer ml-[85px] mb-[20px] bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                            />
                        </label>
                    </div>
            <div className=' mb-4'>
            <label className=' '>
                Product Name:
                <input type="text" name="name" value={productName} onChange={(e) => setProductName(e.target.value)}  className="cursor-pointer ml-[60px] mb-[20px] bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"/>
            </label>
            </div>
            <div className=' mb-4'>
            <label>
            Product Price:
                <input type='number'
                 name="price" 
                value={productPrice}
                onChange={(e) => setProductPrice(e.target.value)}
                 className="cursor-pointer ml-[65px] mb-[20px] bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
           />
            </label>
            </div>
            <div >
            <label>
            Product Quantity:
                <input type="number" name="quantity" value={productQuantity} onChange={(e) => setProductQuantity(e.target.value)} className="cursor-pointer ml-10 mb-[60px] bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"/>
            </label>
            </div>
            <Button variant='destructive' className='shadow-lg shadow-white ' type='submit'>Save Product</Button>
            {/* <button type="submit">Save Product</button> */}
            </div>
            </div>
        </form>
        
    );
};

export default ProductForm;

