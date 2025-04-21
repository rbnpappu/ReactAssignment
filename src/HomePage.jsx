import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [data, setData] = useState([]);
    const [price, setPrice] = useState(0); // Initialize as number

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('https://fakestoreapi.com/products');
                if (res && res.data) {
                    setData(res.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []); // Add empty dependency array to run once

    const handleSubmit = (selectedPrice) => {
        const updatedPrice = price + selectedPrice;
        alert(`Chosen items in Cart total amount: $${updatedPrice.toFixed(2)}`);
        setPrice(updatedPrice);
    };

    return (
        <div className="flex flex-wrap justify-center gap-4 p-4">
            {data.map((item, index) => (
                <div key={index} className="border p-4 rounded shadow w-60">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-gray-700">${item.price}</p>
                    <button 
                        className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
                        onClick={() => handleSubmit(item.price)}
                    >
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
};

export default HomePage;
