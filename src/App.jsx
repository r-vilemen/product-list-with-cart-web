// src/App.js
import { useEffect, useState } from 'react';
import './App.css';
import data from './mainContent/data.js';
import Dessert from './mainContent/Dessert.jsx';
import Cart from './mainContent/Cart.jsx';

function App() {
    const [desserts, setDesserts] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setDesserts(data);
        };

        fetchData();
    }, []);

    const addToCart = (product) => {
        setCartItems(prevItems => {
            const itemIndex = prevItems.findIndex(item => item.name === product.name);
            if (itemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[itemIndex] = { ...updatedItems[itemIndex], quantity: product.quantity };
                return updatedItems;
            } else {
                return [...prevItems, product];
            }
        });
    };

    const removeFromCart = (productName) => {
        setCartItems(prevItems => prevItems.filter(item => item.name !== productName));
    };

    return (
        <div className='container'>
            <main className='app--Container'>
                <h1>Desserts</h1>
                {desserts.map((dessert, index) => (
                    <Dessert
                        key={index}
                        image={dessert.image}
                        category={dessert.category}
                        name={dessert.name}
                        price={dessert.price}
                        addToCart={addToCart}
                        cartItems={cartItems}
                        removeFromCart={removeFromCart}
                    />
                ))}
            </main>
            <aside className='Cart'>
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
            </aside>
        </div>
    );
}

export default App;
