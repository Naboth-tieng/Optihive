import axios from 'axios';
import PaystackPop from '@paystack/inline-js';

export default function Paystack({ setCartItems,cartitems, clientid, email, total }) {

  const paywithpaystack = (e) => {
    e.preventDefault();
    if (total && total !== 0) {
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: "pk_test_beb3a7723be276eefa0a1d3356684fa98a0eb95e",
        amount: total * 100,
        email: email,
        onSuccess(transaction) {
          const orderItems = cartitems.map(item => ({
            productID: item.product_id,
            productName: item.product_name,
            basketquantity: item.basketquantity,
          }));
          const orderDetails = {
            total: total,
            clientid: clientid,
            cartitems: orderItems,
            paymentref: transaction.reference,
          };
          axios.post("http://localhost/optihiveapi/orderprocess/createorder.php", orderDetails, {
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => {
              // Log the response data to the console
              alert("Order created successfully");
              setCartItems([]);

              // You can perform additional actions here if needed
            })
            .catch((error) => {
              console.error("Error creating order:", error);
            });
        },
        onCancel() {
          alert("You have Terminated the transaction");
        }
      });
    } else {
      alert("Fill the cart with items first");
    }
  }

  return (
    <>
      <button className='pay' onClick={paywithpaystack}>Buy</button>
    </>
  );
}
