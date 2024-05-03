 'use client'
import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast"

function OrderForm() {
    const { toast } = useToast()
    const [items, setItems] = useState([{ productId: '', boughtQuantity: 0 }]);
    const [userAddress, setUserAddress] = useState({
        city: '',
        country: '',
        zipCode: ''
    });
    const [totalPrice, setTotalPrice] = useState(0);

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const list = [...items];
        list[index][name] = value;
        setItems(list);
    };

    const handleAddItem = () => {
        
        setItems([...items, { productId: '', boughtQuantity: 0 }]);
    };

    const handleRemoveItem = index => {
        const list = [...items];
        list.splice(index, 1);
        setItems(list);
    };

  
    useEffect(() => {
        const calculateTotalPrice = () => {
            let total = 0;
            items.forEach(item => {
                // Fetch product price based on productId and calculate total price
                // Assuming you have a function fetchProductPrice(productId) to get the price of a product
                // Replace fetchProductPrice(productId) with your actual logic to fetch the product price
                const productPrice = fetchProductPrice(item.productId);
                total += productPrice * item.boughtQuantity;
            });
            setTotalPrice(total);
        };

        calculateTotalPrice();
    }, [items]);

    const fetchProductPrice = async productId => {
        try {
            // Fetch product price from backend based on productId
            const response = await axios.get(`/api/products/${productId}`);
            return response.data.price;
        } catch (error) {
            console.error('Error fetching product price:', error);
            return 0;
        }
    };


    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const response = await axios.post('/orders/create', {
                items,
                userAddress
            });
            if (response.status === 200) {
                alert('Order placed successfully!');
                // Optionally, clear the input fields after successful submission
                setItems([{ productId: '', boughtQuantity: 0 }]);
                setUserAddress({ city: '', country: '', zipCode: '' });
            } else {
                console.error('Failed to place order:', response.statusText);
                alert('Failed to place order. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-y-4 shadow-lg shadow-white">
            <h1 className='text-5xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent  flex  flex-col items-center justify-between p-24'>Create New Order</h1>
            {items.map((item, index) => (
                <div key={index} className=' flex flex-col justify-center  items-center'>
                    <div >
                    <label>
                        Product ID:
                        <input
                            type="text"
                            name="productId"
                            value={item.productId}
                            onChange={e => handleInputChange(index, e)}
                            className="cursor-pointer ml-[65px] mb-[20px] bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                        />
                    </label>

                    </div>
                    <div>
                    <label>
                        Bought Quantity:
                        <input
                            type="number"
                            name="boughtQuantity"
                            value={item.boughtQuantity}
                            onChange={e => handleInputChange(index, e)}
                            className="cursor-pointer ml-[30px] mb-[20px] bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                        />
                    </label>
                    </div>
                    <div>
                    {/* <button type="button" onClick={() => handleRemoveItem(index)}>
                        Remove
                    </button> */}
                    <Button variant='destructive' className='shadow-lg shadow-white mt-[10px] mb-[30px] ml-[40px]' type='submit' onClick={() => handleRemoveItem(index)} >Remove Order</Button>
                    </div>
                </div>
            ))}
           <div className='flex justify-center mb-10'>
            <Button variant='ghost' className='shadow-lg ml-10 shadow-white w-fit flex flex-col justify-center items-center' onClick={handleAddItem} >Add Items</Button>
            </div>
               <div className=' flex flex-col justify-center  items-center' >
            <label>
                City:
                <input
                    type="text"
                    name="city"
                    value={userAddress.city}
                    onChange={e => setUserAddress({ ...userAddress, city: e.target.value })}
                    className="cursor-pointer ml-[60px] mb-[20px] bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                />
            </label>
            <label>
                Country:
                <input
                    type="text"
                    name="country"
                    value={userAddress.country}
                    onChange={e => setUserAddress({ ...userAddress, country: e.target.value })}
                    className="cursor-pointer ml-[35px] mb-[20px] bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                />
            </label>
            <label>
                Zip Code:
                <input
                    type="text"
                    name="zipCode"
                    value={userAddress.zipCode}
                    onChange={e => setUserAddress({ ...userAddress, zipCode: e.target.value })}
                    className="cursor-pointer ml-[30px] mb-[20px] bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded-lg"
                />
            </label>
            </div>
            
            <div className="flex justify-center mb-4">
                <p>Total Price: ${totalPrice.toFixed(2)}</p>
            </div>

            
            <div className='flex felx-col justify-center items-center'>
            <Button variant='default' className='shadow-lg ml-10 shadow-white w-fit flex flex-col justify-center items-center' type="submit"  >Place Order</Button>
            </div>
        </form>
    );
}

export default OrderForm;
