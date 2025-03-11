import React, { useEffect, useState } from 'react';
import validator from 'validator';
import { addToCart, clearCart, removeFromCart } from '../LoginSignup/validation';
import './cart.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    useEffect(() => {
        const items = JSON.parse(localStorage.getItem('cart') || '[]');
        setCartItems(items);
    }, []);


    const handleCheckout = () => {
        if (validator.isCreditCard(cardNumber) && isExpiryDateValid(expiryDate)) {
            clearCart();
            setCartItems([]);
            setErrorMessage(null);
            setSuccessMessage("Purchase Successful");
        } else {
            setErrorMessage("Invalid Card Details!!");
        }
    };

    const handleIncreaseQuantity = (item) => {
        addToCart(item, 1);
        refreshCartItems();
    };

    const handleDecreaseQuantity = (item) => {
        addToCart(item, -1);
        refreshCartItems();
    };

    const handleRemoveItem = (itemId) => {
        removeFromCart(itemId);
        refreshCartItems();
    };

    const refreshCartItems = () => {
        setCartItems(JSON.parse(localStorage.getItem('cart') || '[]'));
    };

    function isExpiryDateValid(expiryDate) {
        const [month, year] = expiryDate.split('/').map(x => parseInt(x));
        const expiry = new Date(2000 + year, month - 1);
        const now = new Date();
        return expiry > now;
    }

    return (
        <div>
        <div className="cart">
            <h2>Your Shopping Cart</h2>
            {cartItems.map(item => (
                <div key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <h4>{item.name}</h4>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: {item.price}</p>
                    <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                    <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                    <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
                </div>
            ))}
            <div className="credit-card-info">
                <h3>About Credit Cards</h3>
                <p>We accept Visa, Mastercard, American Express, and Discover.</p>
                <p>Please make sure to enter your credit card details accurately for a successful checkout.</p>
            </div>
            <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                placeholder="Credit Card Number"
            />
            <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="Expiry Date (MM/YY)"
            />
            <button onClick={handleCheckout}>Checkout</button>
            {errorMessage && (
                <div className="form-group">
                    <span className="text-danger">{errorMessage}</span>
                </div>
            )}
            {successMessage && (
                <div className="form-group">
                    <span className="text-success">{successMessage}</span>
                </div>
            )}
            <button onClick={() => { clearCart(); refreshCartItems(); }}>Clear Cart</button>
           
        </div>
        <footer className="footer">
                <p>&copy; 2024 SOIL Organics. All rights reserved.</p>
            </footer>
    </div>
    );
}

export default Cart;
