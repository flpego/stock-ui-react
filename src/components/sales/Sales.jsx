import { useEffect, useState } from "react"
import { fetchSales } from "../../services/api"
import SaleCard from "./SaleCard"
import SaleForm from "./SaleForm"

const Sales = () => {

    const [sales, setSales] = useState([])
    const loadSales = async () => {
        const data = await fetchSales();
        setSales(data);
          console.log(data)
        return data;
    };
    useEffect(() => {
        loadSales();
    }, [])



    return (
        <div>
            <div>
                            
                <SaleForm  renderSales= {loadSales}/>
            </div>
             <ul>
            {
                sales.map((sale) => {
                    return (
                        <SaleCard
                            key={sale.sale_id}
                            saleId={sale.sale_id}
                            date={sale.sale_date}
                            total={sale.total_amount}
                            method={sale.payment_method}
                            items={sale.items}
                        />
                    )
                })
            }

        </ul>
        </div>
       
    )
}

export default Sales;