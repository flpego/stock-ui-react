import { createBrowserRouter } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import ProductList from '../components/products/ProductList';
import Sales from "../components/sales/Sales"; // Placeholder para cuando lo crees

const router = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />,  // Tu layout principal o dashboard
        children: [
            {
                path: "products",
                element: <ProductList />,  // Ruta para la lista de productos
            },
            {
                path: "sales",
                element: <Sales /> 
            }
        ]
    }
]);

export default router;
