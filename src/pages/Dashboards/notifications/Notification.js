import axios from "axios"
import { useEffect, useState } from "react";
import notify from './notify.svg'

export default function Notification(){
    const [lowQuantityProducts, setLowQuantityProducts] = useState([]);

    useEffect(() => {
      fetchLowQuantityProducts();
    }, []);
  
    const fetchLowQuantityProducts = () => {
      axios
        .get("http://localhost/optihiveapi/notifications.php")
        .then((response) => {
          setLowQuantityProducts(response.data);
          console.log(response.data)
        })
        .catch((error) => {
          console.error("Error fetching low quantity products:", error);
        });
    };

  
    return (
      <div>
          {lowQuantityProducts.map((product) => (
            <div key={product.product_id} style={{marginBottom:"1rem",display:"flex", justifyContent:"center", alignItems:"center"}}>
                <div><img src={notify} style={{marginRight:"0.5rem"}}/></div>
<div>{product.product_name} <b>({product.product_id})</b> is low at <b style={{color:"red"}}>{product.quantity}</b> and should be resupplied by contacting {product.contact_name} using {product.contact_email}            </div>
          </div>))}
      </div>
    );
}