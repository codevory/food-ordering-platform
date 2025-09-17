window.location.href='';
 const button = document.getElementById('button')
let balance = document.querySelector('.balance')
let walletSelector = document.getElementById('wallet-select')
let biteWallet = document.getElementById('bite-wallet')
let walletBalance = Number(JSON.parse(localStorage.getItem('balance')))
let gotDiscount = Number(JSON.parse(localStorage.getItem('discount')))
let discount = document.getElementById('discount')
let totalBill = document.getElementById('total-price')
let savedTotal = JSON.parse(localStorage.getItem('totalOrderValue'))
let subTotal = document.getElementById('subtotal-price')
let savSubTotal = JSON.parse(localStorage.getItem('subTotal'))
let orderMessage = document.querySelector('.order-message')
let form = document.getElementById('form')
let firstName = document.getElementById('first-name')
let email = document.getElementById('email')
let address = document.getElementById('address')
let trackId = document.getElementById('track-id')
let item = JSON.parse(localStorage.getItem('cartItems'))
let name = item.map(item => item.name)
let quant = item.map(item => item.quantity)
let price = item.map(item => item.price)



 balance.classList.add('active')
walletSelector.addEventListener('change', function(event){
 if(event.target.value === "bite"){
    balance.classList.add('active')
     orderMessage.textContent = ""
 }
 if(event.target.value === "gpay"){
    balance.classList.remove('active')
     orderMessage.textContent = "payment method not available yet"
     return
 }
 else if(event.target.value === "paytm"){
     balance.classList.remove('active')
      orderMessage.textContent = "payment method not available yet"
      return
 }
})
subTotal.textContent = `${savSubTotal}`
totalBill.textContent = `$${savedTotal}`
discount.textContent = `${gotDiscount}`
balance.textContent = `Wallet Balance : $${walletBalance}`;




button.addEventListener('click', function(e) {
e.preventDefault()
  // Input validation
  if (firstName.value.trim() === '' || email.value.trim() === '' || address.value.trim() === '') {
    orderMessage.textContent = `Please fill personal details.`;
    return;
  }

if(!balance.classList.contains('active')){
   orderMessage.textContent = "payment method not available yet"
   return
  } 
  else{
    console.log('go now')
  }

  // Convert text content to numbers, removing the dollar sign first
  const currentBalance = parseFloat(balance.textContent.replace('Wallet Balance : $', ''));
  const billAmount = parseFloat(totalBill.textContent.replace('$', ''));
  
  // A good practice is to check if the conversion worked
  if (isNaN(currentBalance) || isNaN(billAmount)) {
    orderMessage.textContent = `Error: Balance or Bill amount is invalid.`;
    return;
  }
  
  // Check the balance and process the order
  if (currentBalance >= billAmount) {
    // 1. Display success message
    orderMessage.textContent = `Thank you! Order successfully placed.`;
    // if(orderMessage.textContent === 'Thank you! Order successfully placed.'){
        orderMessage.style.color = "green"
        trackId.textContent =`ORD${parseInt(Math.floor(Math.random() * new Date()))}`
const newOrder = {
orderId:`${parseInt(Math.floor(Math.random() * new Date().getTime()))}`,
Tracking_Id : trackId.textContent.toString(),
order_Date : new Date().toISOString(),
items:[
  {name:name,price:price,quantity:quant}
],
orderAmount : billAmount,
address:address.value,
status:"Success"
}
saveOrder(newOrder)

function saveOrder(){
let oldOrder = localStorage.getItem('userOrders')
let orders = oldOrder ? JSON.parse(oldOrder) : []

orders.unshift(newOrder)
localStorage.setItem('userOrders',JSON.stringify(orders))
localStorage.removeItem('cartItems')
localStorage.removeItem('discount')
console.log(`order saved for ${newOrder.Tracking_Id}`)
setTimeout(function(){
window.location.href = "track.html"
},2000)
}


    // }
    // 2. Calculate and update the new balance
    let newBalance = (currentBalance - billAmount).toFixed(2);
    balance.textContent = ` wallet Balance : $${newBalance}`;
    localStorage.setItem('balance',JSON.stringify(balance.textContent.replace('wallet Balance : $','')))
 
  }
  
  else {
    // 3. Display low balance message
    orderMessage.textContent = `Low wallet balance.Redirecting to wallet page`;
    setTimeout(function(){
  window.location.href = "wallet.html"
    },3000)
      }

});


// window.onload = function(){
// alert('Form Fields cleared')
// form.reset()
// } 

// function saveOrder(){
//   const oldOrder = localStorage.getItem('userOrders')
//   const orders = oldOrder ? JSON.parse(oldOrder) : []

//   orders.unshift(newOrder)
//   localStorage.setItem('userOrders',JSON.stringify(orders))
//    console.log("Order saved successfully!");
//     alert("Your order has been placed! Order ID: " + orderData.orderId);
// }


