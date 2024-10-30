
const SaleCard = ({date, total, method, items, saleId}) => {
  return (
    <li>
    <h3>Ticket Nº {saleId}</h3>
    <h4>Venta realizada el: {new Date(date).toLocaleDateString()}</h4>
    <p>Total: ${total}</p>
    <p>Método de pago: {method}</p>
    
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.product_name?? "El producto ya no existe"} - {item.quantity?? "X"} unidades
        </li>
      ))}
    </ul>
  </li>
  )
}

export default SaleCard