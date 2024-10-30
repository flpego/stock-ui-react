
const API_URL = 'http://localhost:5200/api';
// CRUD products
//get all products
export const fetchProducts = async () => {
    const productsUrl = '/products'
    const res = await fetch(`${API_URL}${productsUrl}`);
    const data = await res.json();
    return data;
}
//add new product
export const addNewProduct = async (product) => {
    try {
        const res = await fetch(`${API_URL}/products/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
        if (!res.ok) {
            // Manejo de errores de la API
            const errorData = await res.json();
            throw new Error(errorData.msg || "Error al agregar el producto");
        }
        const data = res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
//get product by Id
export const getProductById = async (productId) => {
    try {
        const res = await fetch(`${API_URL}/products/${productId}`)
        if (!res.ok) { const errorData = await res.json(); throw new Error(errorData.msg || "Error al encontrar el producto con id ", productId); }
        return res.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//update a product
export const updateAProduct = async (productId, productData) => {
    try {
        const res = await fetch(`${API_URL}/products/${productId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productData)
        });
        if (!res.ok) {
            // Manejo de errores de la API
            const errorData = await res.json();
            throw new Error(errorData.msg || "Error al agregar el producto");
        }
        const data = res.json();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

//delete a product
export const deleteProduct = async (productId) => {
    const res = await fetch(`${API_URL}/products/${productId}`, {
        method: "DELETE",
    });
    if (!res.ok) {
        const errorData = await res.json();
        return errorData;  // Devolvemos el error capturado
    }
    return res.json();
};


//CRUD sales

export const fetchSales = async () => {
    const res = await fetch(`${API_URL}/sales`);
    const data = await res.json()
    console.log(data)
    return data;
}

export const registerSale = async (sale) => {
    try {
        const res = await fetch(`${API_URL}/sales/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sale)
        });
        if (!res.ok) {
            // Manejo de errores de la API
            const errorData = await res.json();
            throw new Error(errorData.msg || "Error al agregar el producto");
        }
        const data = await res.json();
        console.log(data)
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }

};
