import cart from "./svgs/cart.svg";

export default function ProductSearch({ products, addToCart }) {
    console.log(products)
  return (
    <table className="product-table">
      <thead style={{borderTop: '2px solid #032FA8',
borderBottom: '2px solid #032FA8'}}>
        <tr >
          <th>Name</th>
          <th>Company</th>
          <th>Type</th>
          <th>Mass</th>
          <th>Price per Unit</th>
          <th>Add to Cart</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.product_id}>
            <td>{product.product_name}</td>
            <td>{product.brand_name}</td>
            <td>{product.product_type}</td>
            <td>{product.Mass}</td>
            <td>Ksh {product.price}.00</td>
            <td>
              <button
              style={{border:"none",backgroundColor:"transparent"}}
                onClick={() => addToCart({ ...product })}
              >
                <img src={cart}/>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
