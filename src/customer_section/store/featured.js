import axios from "axios";
import { useState, useEffect } from "react";
import { productImageMap } from "./productImagemap";
import add from "./svgs/add.svg";
// Rest of your Products component code

export default function Featured({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost/optihiveapi/customer/featured.php")
      .then((response) => {
        setProducts(response.data);
        console.log(products);
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
        Featured products
      </p>
      <div>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-around",
          }}
        >
          {products.map((product) => (
            <div
              key={product.product_id}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="featured-display">
                <div style={{ display: "flex" }}>
                  <img
                    style={{ margin: "2rem" }}
                    src={productImageMap[product.product_type]}
                    alt={product.product_name}
                  />

                  <div>
                    <p
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: "400",
                      }}
                    >
                      {product.product_name}
                    </p>
                    <p
                      style={{
                        width: "2rem",
                        color: "rgba(0, 0, 0, 0.40)",
                        fontSize: "1.125rem",
                        fontWeight: "400",
                      }}
                    >
                      {product.brand_name}
                    </p>
                    <div style={{ display: "flex" }}>
                      <p
                        style={{
                          color: "#FF0707",
                          marginRight: "2rem",
                          fontSize: "0.75rem",
                          fontWeight: "400",
                        }}
                      >
                        {product.mass}
                      </p>
                      <p
                        style={{
                          color: "rgba(0, 0, 0, 0.20)",
                          fontSize: "0.75rem",
                          fontWeight: "400",
                        }}
                      >
                        {product.product_type}
                      </p>
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    textAlign: "center",
                    fontSize: "1.125rem",
                    fontWeight: "400",
                  }}
                >
                  Ksh {product.price}.00
                </p>
              </div>

              <button
                className="featured-button"
                onClick={() => addToCart({ ...product })}
              >
                <p
                  style={{
                    paddingRight: "1.4rem",
                    paddingLeft: "1.4rem",
                    fontWeight: "700",
                    fontSize: "1rem",
                  }}
                >
                  add to cart
                </p>
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
