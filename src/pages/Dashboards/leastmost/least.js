import axios from "axios";
import { useEffect, useState } from "react";

export default function Least() {
  const [LeastData, setLeastData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost/optihiveapi/least.php")
      .then(response => {
        setLeastData(response.data);
      })
      .catch(error => {
        console.error("Error fetching warehouse data:", error);
      });
  }, []);



  return (
    <>
      <table style={{ margin: "auto", width: "90%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {LeastData.map((data, index) => (
            <tr key={index}>
              <td style={{color:"rgba(0, 0, 0, 0.50)"}}>{data.product_id}</td>
              <td>{data.product_name}</td>
              <td style={{color:"red"}}>{data.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
