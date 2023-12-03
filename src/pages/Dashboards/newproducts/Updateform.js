import { useState, useEffect } from "react";
import axios from "axios";

export default function UpdateForm() {
  const [productId, setProductId] = useState("");
  const [productInfo, setProductInfo] = useState({
    name: "",
    currentQuantity: "",
  });
  const [quantityToAdd, setQuantityToAdd] = useState("");

  useEffect(() => {
    // Check if the productId is not empty
    if (productId) {
      const productid = productId;
      console.log(productid);
      // Fetch product information based on the productId
      axios
        .post("http://localhost/optihiveapi/getProductInfo.php/", productid)
        .then((response) => {
          console.log(response.data);
          const name = response.data.product_name;
          const currentQuantity = response.data.quantity;
          setProductInfo({ name, currentQuantity });
        })
        .catch((error) => {
          console.error(error);
          // Handle error
        });
    }
  }, [productId]);

  const UpdateProduct = (event) => {
    event.preventDefault();
    const updateData = {
      product_id: productId,
      quantityToAdd: quantityToAdd,
    };

    axios
      .post("http://localhost/optihiveapi/restock.php/", updateData)
      .then((response) => {
        console.log(response.data);
        // Handle success or error as needed
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <>
      <form style={{ display: "grid", margin: "1rem" }}>
        <input
          type="text"
          placeholder="Product ID"
          name="productId"
          onChange={(e) => setProductId(e.target.value)}
        />
        <table className="storagestable">
          <tr>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
          <tr></tr>
          <tr>
            <td>{productInfo.name}</td>
            <td>{productInfo.currentQuantity}</td>
          </tr>
        </table>
        <input
          type="text"
          placeholder="Quantity to Add"
          name="quantityToAdd"
          onChange={(e) => setQuantityToAdd(e.target.value)}
        />
        <button
          style={{
            fontWeight: "bolder",
            color: "white",
            marginTop: "3rem",
            borderRadius: "1.25rem",
            background: "#000",
          }}
          onClick={(e) => UpdateProduct(e)}
        >
          Submit
        </button>
      </form>
    </>
  );
}
