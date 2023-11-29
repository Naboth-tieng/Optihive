import axios from "axios";
import { useState, useEffect } from "react";
import { productImageMap } from "./productImagemap";
import add from "./svgs/add.svg";
// Rest of your Products component code

export default function Ending({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/optihiveapi/customer/ending.php")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <p
        style={{ textAlign: "center", fontSize: "3rem", fontWeight: "bolder" }}
      >
        Ending products
      </p>
      <div>
        <div className="ending-product">
          {products.map((product) => (
            <div key={product.product_id} className="product_cont">
              <div className="ending-display">
                <img
                  className="ending-icon"
                  src={productImageMap[product.product_type]}
                  alt={product.product_name}
                />
                <button
                  className="ending-button"
                  onClick={() => addToCart({ ...product })}
                >
                  <img src={add} />
                </button>
              </div>
              <div style={{ display: "flex" }}>
                <p>{product.product_name}</p>
                <p>{product.brand_name}</p>
              </div>
              <div style={{ display: "flex" }}>
                <p>{product.Mass}</p>
                <p>{product.product_type}</p>
              </div>
              <p>Ksh {product.price}.00</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
