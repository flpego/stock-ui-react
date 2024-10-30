import { useState } from "react";
import UpdateProductModal from "./UpdateProductModal";
import { deleteProduct } from "../../services/api";

const ProductCard = ({ productId, category, name, description, stock, price, supplier, renderProduct }) => {

  const [openModal, setOpenModal] = useState(false)

  const toggleModal = () => {
    setOpenModal(!openModal);
  };



  const deleteProductFn = async (productId, name) => {
    const confirm = window.confirm(`¿Está seguro que quiere eliminar el producto ${name}?`);
    if (!confirm) return;

    try {
        const result = await deleteProduct(productId);
        console.log(result);
        console.log(result.message)
        console.log(result.msg)
        if (result.message) {
            alert(result.message);
        } else {
            alert("Producto eliminado con éxito");renderProduct();
        }
    } catch (error) {
        console.error("Error al intentar eliminar el producto:", error);
        alert("Ocurrió un error inesperado al eliminar el producto.");
    }
};

  return (
    <li>
      <div>
        <h3>{category}</h3> - <p>{name}</p> <br />
        <p>{description}</p> <br />
        <p>$
          {price}</p> <br />
        <p>Proveedor: {supplier}</p>
        <p>Stock: {stock}</p>
      </div>

      <div>

        <button onClick={toggleModal}>Actualizar</button>
        <button onClick={() => deleteProductFn(productId, name)}>Borrar</button>
      </div>
      {openModal && (
        <UpdateProductModal
          productId={productId}
          category={category}
          name={name}
          description={description}
          stock={stock}
          price={price}
          supplier={supplier}
          closeModal={toggleModal}
        />
      )}
    </li>
  )
}

export default ProductCard;