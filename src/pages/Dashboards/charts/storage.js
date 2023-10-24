import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import axios from "axios";
import './charts.css'

function WarehouseCharts({warehouseData}) {

  

  return (
    <div className="overview">
      {Object.keys(warehouseData).map(warehouseId => (
        <div className="box">
          <h2>Warehouse {warehouseId}</h2>
          <Chart
            width={"25rem"}
            height={"auto"}
            chartType="PieChart"
            data={[
              ["Product Type", "Total Quantity"],
              ...warehouseData[warehouseId].map(product => [
                product.product_type,
                parseInt(product.total_quantity)
              ])
            ]}
            options={{
              pieHole:0.9,
              backgroundColor: '#f2f2f2',              
            }}
          />
        </div>
      ))}
    </div>
  );
}

export default WarehouseCharts;
