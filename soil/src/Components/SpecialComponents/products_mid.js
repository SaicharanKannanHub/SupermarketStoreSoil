import axios from "axios";

const API_HOST = "http://localhost:4006";

async function loadProducts() {
    try {
        const response = await axios.get(API_HOST + "/api/products");
        return response.data;
    } catch (error) {
        console.error('Error loading products:', error);
        throw error;
    }
}

export {
    loadProducts
};
