import { useEffect, useState } from "react"
import { fetchProducts } from "../../services/api"
import ProductCard from "./ProductCard"
import ProductForm from "./ProductForm"

const ProductList = () => {

    const [products, setProducts] = useState([])
    const loadProducts = async () => {
        const data = await fetchProducts();
        setProducts(data);
        console.log(data)
        return data
    };

    useEffect(() => {
        loadProducts();
    }, [])



    return (
        <div>
            <div>
                <ProductForm renderProduct={loadProducts} />
            </div>
            <ul>
                {
                    products.map((product) => {
                        return (
                            <ProductCard
                                key={product.product_id}
                                productId={product.product_id}
                                category={product.category}
                                name={product.name}
                                description={product.description}
                                stock={product.stock}
                                price={product.price}
                                supplier={product.supplier}
                                renderProduct={loadProducts}
                                 />)
                    })
                }
            </ul>
        </div>

    )
}

export default ProductList;