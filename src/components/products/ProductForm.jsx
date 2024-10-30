import { useState } from "react"
import { addNewProduct } from "../../services/api";

const ProductForm = ({ renderProduct }) => {

    const initialProductValues = {
        name: '',
        description: '',
        price: '',
        stock: '',
        category: '',
        supplier: '',
        min_stock: ''
    }

    const [product, setProduct] = useState(initialProductValues);
    const [errorMsg, setErrorMsg] = useState(null);

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await addNewProduct(product);
            setProduct(initialProductValues);
            renderProduct();
            console.log('Producto agregado:', response);
        } catch (error) {
            setErrorMsg(error.message);
        }
    }



    return (

        <form onSubmit={handleSubmit}>
            {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
            <label>
                Categoria del producto:
                <input
                    type="text"
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="Categoria"
                />
            </label>
            <label>
                Nombre del producto:
                <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Nombre"
                />
            </label>
            <label>
                Descripcion del producto:
                <input
                    type="text"
                    name="description"
                    value={product.description}
                    onChange={handleChange}
                    placeholder="Descripcion"
                />
            </label>
            <label>
                Precio del producto:
                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Precio"
                />
            </label>
            <label>
                Stock del producto:
                <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Stock"
                />
            </label>
            <label>
                Proovedor del producto:
                <input
                    type="text"
                    name="supplier"
                    value={product.supplier}
                    onChange={handleChange}
                    placeholder="Proovedor"
                />
            </label>
            <label>
                Stock minimo:
                <input
                    type="text"
                    name="min_stock"
                    value={product.min_stock}
                    onChange={handleChange}
                    placeholder="Stock minimo"
                />
            </label>
            <button type="submit">Add</button>
        </form>

    )
}

export default ProductForm