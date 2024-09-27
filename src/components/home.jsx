import React, { useEffect, useState } from 'react';

const Home = () => {
    const [formData, setFormData] = useState({ item: '', price: '' });
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);
    const [itemError, setItemError] = useState('');
    const [priceError, setPriceError] = useState('');

    useEffect(() => {
        const storedTotal = localStorage.getItem('total');
        const storedItems = localStorage.getItem('items');
        const newTotal = storedTotal ? Number(storedTotal) : 0;
        let newItems = [];
        if (storedItems) {
            try {
                newItems = JSON.parse(storedItems);
            } catch (error) {
                console.error("Error parsing items from localStorage:", error);
            }
        }
        setTotal(newTotal);
        setItems(newItems);
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'item') setItemError('');
        if (e.target.name === 'price') setPriceError('');
    };

    const validate = () => {
        let isValid = true;
        if (!formData.item.trim()) {
            setItemError('Item name is required.');
            isValid = false;
        }
        if (!formData.price) {
            setPriceError('Item Price is required.');
            isValid = false;
        } else if (Number(formData.price) <= 0) {
            setPriceError('Item Price must be positive number.');
            isValid = false;
        }
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;
        const itemPrice = Number(formData.price);
        const storedTotal = total + itemPrice;
        const storedItems = [...items, formData];
        localStorage.setItem('items', JSON.stringify(storedItems));
        localStorage.setItem('total', storedTotal.toString());
        setTotal(storedTotal);
        setItems(storedItems);
        setFormData({ item: '', price: '' });
    };

    const handleClear = () => {
        localStorage.removeItem('items');
        localStorage.removeItem('total');
        setFormData({ item: '', price: '' });
        setTotal(0);
        setItems([]);
        setItemError('');
        setPriceError('');
    };

    return (
        <>
            <div className='min-h-full w-4/5 sm:w-3/5 lg:w-1/2 mx-auto'>
                <div className="flex flex-1 flex-col justify-center py-12">
                    <h2 className="mt-10 text-center text-5xl font-bold leading-[50px] tracking-tight text-gray-900 font-serif">Expense Tracker</h2>
                    <div className="mt-10">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="item" className="block text-2xl leading-6 text-gray-900 font-semibold">Item Name:</label>
                                <div className="mt-3">
                                    <input id="item" name="item" type="text" value={formData.item} onChange={handleChange} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${itemError ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 px-1.5`} />
                                    {itemError && <p className="text-red-500">{itemError}</p>}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="price" className="block text-2xl leading-6 text-gray-900 font-semibold">Item Price:</label>
                                </div>
                                <div className="mt-3">
                                    <input id="price" name="price" type="number" value={formData.price} onChange={handleChange} className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ${priceError ? 'ring-red-500' : 'ring-gray-300'} placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 px-1.5`} min="1" />
                                    {priceError && <p className="text-red-500">{priceError}</p>}
                                </div>
                            </div>

                            <div className='flex justify-between space-x-5'>
                                <button type="submit" className="flex justify-center rounded-md bg-blue-600 w-40 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" aria-label="Add Item" > Add Item </button>
                                <button type="button" onClick={handleClear} className="flex justify-center rounded-md bg-blue-600 w-40 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600" aria-label="Clear All Items" > Clear All </button>
                            </div>
                        </form>

                        {items.length > 0 ? (
                            items.map((item, index) => (
                                <div key={index} className='bg-blue-200 px-2 py-1 text-base mt-3 border-2 border-gray-500'>
                                    <p className='text-black text-xl'>{item.item}: ₹{item.price}</p>
                                </div>
                            ))
                        ) : (
                            <></>
                        )}

                        <div className='text-center w-full mt-2'>
                            <span className='text-2xl font-semibold'>
                                {total > 0 ? 'Total: ₹' + total : ''}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
