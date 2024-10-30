import { useState } from "react";
import { updateAProduct } from "../../services/api";

const UpdateProductModal = ({ productId, category, name, description, stock, price, supplier, closeModal }) => {


    const [formValues, setFormValues] = useState({
        category,
        name,
        description,
        stock,
        price,
        supplier,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("Datos actualizados:", formValues);
            // Llamada a la API para actualizar el producto
            const response = await updateAProduct(productId, formValues);
            console.log("Producto actualizado:", response);
            // Puedes manejar la respuesta de la API aquí o llamar a una función para recargar los productos
            closeModal(); // Cerrar el modal después de la actualización
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
        }
    }

    return (
        <div>
            <div><button onClick={closeModal}>Cerrar</button></div>
            <form onSubmit={handleSubmit}>
                <label>
                    Categoría del producto:
                    <input
                        type="text"
                        name="category"
                        value={formValues.category}
                        onChange={handleChange}
                        placeholder="Categoría"
                    />
                </label>
                <label>
                    Nombre del producto:
                    <input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                        placeholder="Nombre"
                    />
                </label>
                <label>
                    Descripción del producto:
                    <input
                        type="text"
                        name="description"
                        value={formValues.description}
                        onChange={handleChange}
                        placeholder="Descripción"
                    />
                </label>
                <label>
                    Precio del producto:
                    <input
                        type="number"
                        name="price"
                        value={formValues.price}
                        onChange={handleChange}
                        placeholder="Precio"
                    />
                </label>
                <label>
                    Stock del producto:
                    <input
                        type="number"
                        name="stock"
                        value={formValues.stock}
                        onChange={handleChange}
                        placeholder="Stock"
                    />
                </label>
                <label>
                    Proveedor del producto:
                    <input
                        type="text"
                        name="supplier"
                        value={formValues.supplier}
                        onChange={handleChange}
                        placeholder="Proveedor"
                    />
                </label>

                <button type="submit">Guardar</button>
            </form>
        </div>
    )
}


export default UpdateProductModal;