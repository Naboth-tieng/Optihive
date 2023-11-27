// ... your imports

import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function Insertform({onNewItemOrRestock}) {
    const [productName, setProductName] = useState('');
    const [productType, setProductType] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [warehouseId, setWarehouseId] = useState('');
    const [quantity, setQuantity] = useState('');
    const [selectedSupplierId, setSelectedSupplierId] = useState('');
  
    const CreateProduct = (event) => {
        event.preventDefault(); // Prevent the default form submission
        
        // Use the selected supplier ID
        const productData = {
          product_name: productName,
          product_type: productType,
          supplier_id: selectedSupplierId,
          warehouse_id: warehouseId,
          quantity: quantity,
          brand_name: selectedBrand,
        };
      
        axios.post('http://localhost/optihiveapi/insertproducts.php/', productData)
          .then(response => {
            console.log(response.data);
            // Handle success or error as needed
          })
          .catch(error => {
            console.error(error);
            // Handle error
          });
      };
      
  
    // Update the selected supplier ID when brand name changes
    useEffect(() => {
      if (selectedBrand === 'Dawaat') {
        setSelectedSupplierId('1');
      } else if (selectedBrand === 'Manji') {
        setSelectedSupplierId('2');
      } else if (selectedBrand === 'Broadways') {
        setSelectedSupplierId('3');
      } else if (selectedBrand === 'Brookside') {
        setSelectedSupplierId('4');
      } else if (selectedBrand === 'Unilever') {
        setSelectedSupplierId('5');
      }
      // Add more conditions for other suppliers
    }, [selectedBrand]);
  
    return (
      <>
        <form style={{ display: "grid", margin: "2rem" }}>
          <input
            type="text"
            placeholder="Product Name"
            name="productName"
            onChange={(e) => setProductName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Product Type"
            name="productType"
            onChange={(e) => setProductType(e.target.value)}
          />
          <select
            name="brandName"
            style={{
              borderRadius:"0.4rem",
              fontWeight:"bold",
              marginTop:"0.56rem",
              background:"transparent"
            }}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="" disabled selected>Select Brand</option>
            <option value="Dawaat">Dawaat</option>
            <option value="Manji">Manji</option>
            <option value="Broadways">Broadways</option>
            <option value="Brookside">Brookside</option>
            <option value="Unilever">Unilever</option>
            {/* Add more options for other brands */}
          </select>
          <input
            type="text"
            placeholder="Warehouse ID"
            name="warehouseId"
            onChange={(e) => setWarehouseId(e.target.value)}
          />
          <input
            type="text"
            placeholder="Quantity"
            name="quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
<button  style={{fontWeight:"bolder",color:"white",marginTop:"3rem",borderRadius: '1.25rem',background: '#000'}}onClick={(e) => CreateProduct(e)}>Submit</button>
        </form>
      </>
    );
  }
  