import axios from "axios";

const API_HOST = "http://localhost:4006";
const USER_KEY = "user";



function removeFromCart(itemId) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
}
function clearCart() {
    localStorage.removeItem('cart');
}

function addToCart(item, quantity = 1) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity <= 0) {
            // Remove the item from the cart if the quantity is 0 or less
            cart.splice(cart.indexOf(existingItem), 1);
        }
    } else if (quantity > 0) {
        // Add new item to the cart only if the quantity is positive
        cart.push({ ...item, quantity });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartItemQuantity(itemId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(cartItem => cartItem.id === itemId);

    if (item) {
        if (quantity > 0) {
            item.quantity = quantity;
        } else {
            // Remove the item from the cart if the quantity is set to zero or less
            cart.splice(cart.indexOf(item), 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    }
}
async function updateProfile_MID(email, data) {
    try {
        const response = await axios.put(API_HOST + "/api/profile/update", {params: {
            email: email, // Add email to the request body
            ...data      // Spread other data (name, dob, etc.) into the request body
        }});
    

        return response.data;
    } catch (error) {
        console.error('Error updating profile:', error);
        throw error;
    }
}
async function getProfile_MID(email) {
    const response = await axios.get(API_HOST + `/api/profile/select/${email}`);

    return response.data;

}
async function deleteProfile_MID(email){
    const response = await axios.delete(API_HOST + "/api/profile/delete",{ params: { email } });

    return response.data;
}



async function verifyUser_MID(email,password){
    const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
    const user = response.data;

    if(user !== null){
        // const stringit = JSON.stringify(user);
        // setUser(stringit);
        // return stringit;
        setUser(user);

        return user;

    }

    
}
async function findUser_MID(id) {
    const response = await axios.get(API_HOST + `/api/users/select/${id}`);
    if(response !== null){
        return response.data;
    }
    else return null
  
    
  }
  
  async function createUser_MID(user) {
    const response = await axios.post(API_HOST + "/api/users", user);
  
    return response.data;
  }

  function setUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  
  function getUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  }
  
  function removeUser() {
    localStorage.removeItem(USER_KEY);
  }






export {
    setUser,
    getUser,
    removeUser,
    removeFromCart,
    clearCart,
    addToCart,
    updateCartItemQuantity,
    getProfile_MID,
    verifyUser_MID,
    findUser_MID,
    createUser_MID,
    updateProfile_MID,
    deleteProfile_MID
}
