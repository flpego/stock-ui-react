import { useState, useEffect } from "react";
import { fetchProducts, registerSale } from '../../services/api'
const SaleForm = ({renderSales}) => {
  const initialSaleValue = {
    total_amount: 0,
    payment_method: '',
    items: []
  };

  const [products, setProducts] = useState([]);
  const [sale, setSale] = useState(initialSaleValue);
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);


  const loadProducts = async () => {
    const data = await fetchProducts();
    setProducts(data);
  };

 

  useEffect(() => {

    loadProducts();
  }, []);

  const handleProductChange = (productId, quantity) => {
    const updatedItems = sale.items.map(item =>
      item.product_id === productId
        ? { ...item, quantity: parseInt(quantity) || 0 }
        : item
    );
  
    // Si el producto no está en `items`, agrégalo
    if (!updatedItems.some(item => item.product_id === productId)) {
      updatedItems.push({ product_id: productId, quantity: parseInt(quantity) || 0 });
    }
  
    setSale({ ...sale, items: updatedItems });
  }
  // Cargar los productos disponibles
  
  


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validItems = sale.items.filter(item => item.quantity > 0);
  
  if (validItems.length === 0) {
    setErrorMsg("Debe haber al menos un producto con una cantidad mayor a 0.");
    return;
  }

  const totalAmount = validItems.reduce((acc, item) => {
    const product = products.find(p => p.product_id === item.product_id);
    return acc + (product.price * item.quantity);
  }, 0);

    try {
      const response = await registerSale({
        ...sale,
        items: validItems,
        total_amount: totalAmount
      });
      console.log("Datos de la venta:", sale);

      console.log(response)

      setSuccessMsg("Venta registrada exitosamente");
      setErrorMsg(null);
      setSale(initialSaleValue);
      renderSales();
      loadProducts();
    } catch (error) {
      setErrorMsg("Error al registrar la venta: " + error.message);
      setSuccessMsg(null);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
      {successMsg && <p style={{ color: "green" }}>{successMsg}</p>}
      <label>
        Método de pago:
        <select
          name="payment_method"
          value={sale.payment_method}
          onChange={(e) => setSale({ ...sale, payment_method: e.target.value })}
        >
          <option value="">Seleccionar método de pago</option>
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta de crédito">Tarjeta de crédito</option>
        </select>
      </label>

      {products.map((product) => (
        <div key={product.product_id}>
          <label>
            {product.name} (Precio: ${product.price} / Stock: {product.stock})
            <input
              type="number"
              min="0"
              placeholder="Cantidad"
              onChange={(e) => handleProductChange(product.product_id, e.target.value)}
            />
          </label>
        </div>
      ))}

      <button type="submit">Registrar venta</button>
    </form>
  )
}

export default SaleForm