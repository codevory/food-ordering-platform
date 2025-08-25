let inputId = document.getElementById('track-input')
let loader = document.querySelector('.loader')
const btn = document.getElementById('track-btn')
const orderIdSp = document.getElementById('order-id') 
const orderAmount = document.getElementById('order-amount')
const date = document.getElementById('order-date')
const address = document.getElementById('location-space')
const items = document.getElementById('items')
const quantity = document.getElementById('quantity')
const orderCont = document.getElementById('lower-container')

let info = localStorage.getItem('userOrders')
let data = JSON.parse(info)

let orderFound = data.find(item => item.Tracking_Id === inputId.value.trim())




btn.addEventListener('click',function(){
    let orderFound = data.find(order => order.Tracking_Id === inputId.value.trim())
  loader.classList.remove('hidden')
  orderCont.classList.add('hidden')
    setTimeout(() => {
loader.classList.add('hidden')
orderCont.classList.remove('hidden')
  if(orderFound){
        console.log(orderFound)
        displayOrder(orderFound)
    }
    else{
        console.log('not able to get data')
    }
    },1000)
  
})


function displayOrder(order){
    const orderdate = new Date(order.order_Date).toLocaleDateString('en-IN',{
        day:"numeric",
        month:"long",
        year:"numeric"
    })
    date.textContent = orderdate
    const Ordaddress = order.address
    address.textContent = Ordaddress
    orderIdSp.textContent = order.orderId
    orderAmount.textContent = `$${order.orderAmount}`
    order.items.forEach(item => {
 items.textContent = item.name
    quantity.textContent = `Quantity : ${item.quantity}`

    })
    
}