import { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateForm() {
  const [productId, setProductId] = useState('');
  const [productInfo, setProductInfo] = useState({ name: '', currentQuantity: '' });
  const [quantityToAdd, setQuantityToAdd] = useState('');

  useEffect(() => {
    // Check if the productId is not empty
    if (productId) {
      const productid = productId;
      console.log(productid)
      // Fetch product information based on the productId
      axios.post('http://localhost/optihiveapi/getProductInfo.php/', productid)
        .then(response => {
          console.log(response.data)
          const name = response.data.product_name;
          const currentQuantity = response.data.quantity;
          setProductInfo({ name, currentQuantity });
        })
        .catch(error => {
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

    axios.post('http://localhost/optihiveapi/restock.php/', updateData)
      .then(response => {
        console.log(response.data);
        // Handle success or error as needed
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  };

  return (
    <>
      <form style={{ display: "grid" }}>
        <input
          type="text"
          placeholder="Product ID"
          name="productId"
          onChange={(e) => setProductId(e.target.value)}
        />
          <label>Product Name:</label> 
          <label>{productInfo.name}</label>
          <label>Current Quantity:</label>
          <label> {productInfo.currentQuantity}</label>
        <input
          type="text"
          placeholder="Quantity to Add"
          name="quantityToAdd"
          onChange={(e) => setQuantityToAdd(e.target.value)}
        />
        <button onClick={(e) => UpdateProduct(e)}>Submit</button>
      </form>
    </>
  )
}
