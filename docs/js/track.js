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
const message = document.querySelector('.message')
const popup = document.querySelector('.pop')
let ordHead = document.querySelector('#ord-sp')
let ordTxt = document.querySelector('.ord-txt')
let ordSp = document.getElementById('ord-sp')

orderCont.classList.add('hidden')
message.classList.add('hidden')
popup.classList.add('hidden')
loader.classList.add('hidden')

let data = JSON.parse(localStorage.getItem('userOrders'))
// let ids = data.map(item => item.Tracking_Id)
ordSp.innerHTML = data.map((item,index) => {
    return `${item.Tracking_Id}` ? `<li> ${item.Tracking_Id}</li>` : []
}).join('')


let orderFound = data.find(item => item.Tracking_Id === inputId.value.trim())




btn.addEventListener('click', function () {
    let orderFound = data.find(item => item.Tracking_Id === inputId.value.trim())

  setTimeout(function() {
    if (inputId.value.trim() ==="") {
        loader.classList.add('hidden')
        popup.classList.remove('hidden')
    }
},2)
loader.classList.remove('hidden')
orderCont.classList.add('hidden')
message.classList.add('hidden')
popup.classList.remove('hidden')



    setTimeout(() => {
        if (orderFound) {
            console.log(orderFound)
            displayOrder(orderFound)
            orderCont.classList.remove('hidden')
            loader.classList.add('hidden')
        }
    }, 700)

    loader.classList.remove('hidden')
    orderCont.classList.add('hidden')
    message.classList.add('hidden')
    popup.classList.add('hidden')

    setTimeout(function () {
        if (inputId.value.trim() && !orderFound) {
            loader.classList.add('hidden')
            message.classList.remove('hidden')
            console.log(!orderFound)
        }
    }, 1000)

loader.classList.remove('hidden')
orderCont.classList.add('hidden')
message.classList.add('hidden')
popup.classList.add('hidden')


})

function displayOrder(order) {
    const orderdate = new Date(order.order_Date).toLocaleDateString('en-IN', {
        day: "numeric",
        month: "long",
        year: "numeric"
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