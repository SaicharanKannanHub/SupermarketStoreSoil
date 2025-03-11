import React, { useState, useEffect } from 'react';
import strawberry from './pictures/strawberry.jpg';
import spinach from './pictures/spinach.jpg';
import blueberry from './pictures/blueberry.jpg';
import eggs from './pictures/eggs.jpg';
import basil from './pictures/basil.jpg';
import avocado from './pictures/avocado.jpg';
import "./Special.css"
import { loadProducts } from './products_mid'; 

function Specials() {
    // Load specials from local storage or use default values
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const productsData = await loadProducts();
                setProducts(productsData);
            } catch (error) {
                console.error('Error loading products:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <h2>Our Products</h2>
            <div className="product-list">
                {products.map(product => (
                    <div key={product.id} className="product-card">
                        <h3>{product.product_name}</h3>
                        <p>Price: ${product.price}</p>
                        <p>{product.isSpecial ? 'Special Product' : 'Regular Product'}</p>
                    </div>
                ))}
            </div>
            <footer className="footer">
                <p>&copy; 2024 SOIL Organics. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Specials;
