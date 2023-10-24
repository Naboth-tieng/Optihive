import { useState } from 'react';
import axios from 'axios';

export default function UpdateForm() {
  const [productId, setProductId] = useState('');
  const [quantityToAdd, setQuantityToAdd] = useState('');

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
          style={{ marginBottom: "1rem" }}
          onChange={(e) => setProductId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Quantity to Add"
          name="quantityToAdd"
          style={{ marginBottom: "1rem" }}
          onChange={(e) => setQuantityToAdd(e.target.value)}
        />
<button onClick={(e) => UpdateProduct(e)}>Submit</button>
      </form>
    </>
  )
}
