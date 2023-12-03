import PaystackPop from '@paystack/inline-js';

export default function Paystack({email,total}) {
  
  const paywithpaystack = (e) =>{
    e.preventDefault()
    if (total && total !== 0) {
    const paystack = new PaystackPop()
    paystack.newTransaction({
        key:"pk_test_beb3a7723be276eefa0a1d3356684fa98a0eb95e",
        amount: total*100,
        email: email,
        onSuccess(transaction){
            let message = `Payment Complete Reference ${transaction.reference}`
            alert(message)
        },
        onCancel(){
            alert("You have Terminated the transaction")
        }
    })} else{
      alert("Fill the cart with items firets")
    }
  }

  return (
    <>
      <button className='pay' onClick={paywithpaystack}>Buy</button>
    </>
  );
}
