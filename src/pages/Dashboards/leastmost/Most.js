import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Most(){
    const [MostData, SetMostData] = useState([]);

    useEffect(() => {
      axios.get("http://localhost/optihiveapi/most.php")
        .then(response => {
          SetMostData(response.data);
        })
        .catch(error => {
          console.error("Error fetching warehouse data:", error);
        });
    }, []);

    return(
        <table style={{margin:"auto",width:"90%"}}>
        <thead>
          <tr className="tableheading" >
            <th>ID</th>
            <th>Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {MostData.map((data, index) => (
            <tr key={index}>
              <td style={{color:"rgba(0, 0, 0, 0.50)"}}>{data.product_id}</td>
              <td>{data.product_name}</td>
              <td style={{color:"green"}}>{data.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    )
}