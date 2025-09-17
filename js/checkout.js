document.addEventListener('DOMContentLoaded',() => {

const itemList = document.getElementById('item-list');
const name = document.querySelector('.item-name')
let totalPrice = document.getElementById('total-price');
let item = JSON.parse(localStorage.getItem('cartItems'))
let itemName = item.map(item => item.name)
let price = item.map(item => item.price)
let quantity = item.map(item => item.quantity)
let subTotalValue = 0; // Will hold the numeric subtotal
let discountValue = 0;
let taxValue = 12.5;


// Get DOM elements
const couponBtn = document.getElementById('apply-coupon-btn');
const message = document.getElementById('coupon-message');
const couponInput = document.getElementById('couponInput');
const subTotalElement = document.getElementById('subtotal-price');
const discountElement = document.getElementById('discount');
const totalPriceElement = document.getElementById('total-price'); // Assuming you have this ID in your HTML
const tax = document.getElementById('tax')
// Initial cart updation
subTotalValue = `${item.reduce((total, item) => total + (item.price * item.quantity) , 0).toFixed(2)}`;
totalPrice.textContent = `${item.reduce((total, item) => total + (item.price * item.quantity), 0 + taxValue).toFixed(2)}`;
totalPriceElement.innerText = `${item.reduce((total, item) => total + (item.price * item.quantity), 0 + taxValue).toFixed(2)}`;
 localStorage.setItem('totalOrderValue',JSON.stringify(totalPrice.textContent))
    localStorage.setItem('subTotal',JSON.stringify(subTotalValue))
//Finishes cart & localStorage updation

name.innerHTML = itemName.map((name, index) => {
    return `<li>${name} - $${price[index]}   <span class="buttons"><button class ="left-btn">–</button><input type="text" class ='btn-inp' value = "1" min = "0"  readonly ><button class ="right-btn">+</button></span>
 </li>` ;
}).join('');

let buttons = document.querySelectorAll('.buttons')
let leftBtn = document.querySelectorAll('.left-btn')
let rightBtn = document.querySelectorAll('.right-btn')
let quantInput = document.querySelectorAll('.btn-inp')


    rightBtn.forEach((btn,index) => {
        quantInput[index].value = quantity[index]
btn.addEventListener('click',function(){
    let totalPrice = document.getElementById('total-price');
    if(rightBtn[index]){
        const subTotalElement = document.getElementById('subtotal-price');
      let  calQuant =  parseInt(quantInput[index].value++);
    item[index].quantity = quantInput[index].value
    localStorage.setItem('cartItems', JSON.stringify(item))
    calQuant = quantInput[index].value
    let price = item[index].price
    
        let total2 = item.reduce((total,item) => total + (item.price * item.quantity),0 ).toFixed(2)
        console.log(total2)
        subTotalElement.textContent = total2
       let totval = `${(Number(subTotalElement.innerText) + Number(taxValue)).toFixed(2)}`
        console.log(totval)
        totalPrice.textContent = totval
           localStorage.setItem('totalOrderValue',JSON.stringify(totalPriceElement.textContent))
    localStorage.setItem('subTotal',JSON.stringify(subTotalElement.innerText))
    }
})
    })
   
 leftBtn.forEach((btn,index) => {
    btn.addEventListener('click',function(){
        let totalPrice = document.getElementById('total-price');
        if(leftBtn[index]){
   let decQuant = parseInt(quantInput[index].value--);
   decQuant = quantInput[index].value
     item[index].quantity = decQuant;
     let price = item[index].price;
     localStorage.setItem('cartItems',JSON.stringify(item))
     console.log(decQuant)
      console.log('Payable amount :',price*decQuant)
      let total = item.reduce((total,item) => total + (item.price * item.quantity),0 ).toFixed(2)
        console.log(total)
         subTotalElement.innerText = total
         let totval = `${(Number(subTotalElement.innerText) + Number(taxValue)).toFixed(2)}`
       totalPrice.textContent = totval
     localStorage.setItem('totalOrderValue',JSON.stringify(totalPriceElement.textContent))
    localStorage.setItem('subTotal',JSON.stringify(subTotalElement.innerText))
       
        }


        if(quantInput[index].value < 1){
            const parent = quantInput[index].closest('li')

            if(parent){
parent.remove()
            }
            item.splice(index,1)
            localStorage.setItem('cartItems',JSON.stringify(item))
}
    })




})


// New lines of code



// console.log('Total is :',taxValue + subTotalElement.innerText)


// 
// totalPriceElement.innerText = `${subTotalElement.innerText} + ${taxValue}`;





// Coupon system
const coupons = {
    'GET20OFF': { type: 'percentage', value: 20, minPurchase: 400, expires: new Date('2025-12-31') },
    'FLAT50': { type: 'fixed', value: 50, minPurchase: 10, expires: new Date('2025-11-30') },
    'FREESHIP': { type: 'free-shipping', value: 0, minPurchase: 1500, expires: new Date('2025-10-31') },
    'WELCOME20': { type: 'percentage', value: 20, minPurchase: 750, expires: new Date('2025-09-30') }
};



// // Get DOM elements
// const couponBtn = document.getElementById('apply-coupon-btn');
// const message = document.getElementById('coupon-message');
// const couponInput = document.getElementById('couponInput');
// const subTotalElement = document.getElementById('subtotal-price');
// const discountElement = document.getElementById('discount');
// const totalPriceElement = document.getElementById('total-price'); // Assuming you have this ID in your HTML
// const tax = document.getElementById('tax')
// Use variables to hold the actual numeric values for calculations
// let subTotalValue = 0; // Will hold the numeric subtotal
// let discountValue = 0;
// let taxValue = 12.5;

// subTotalValue = item.reduce((total, item) => total + (item.price * item.quantity) + taxValue , 0);

// =========================================================
// FUNCTIONS
// =========================================================

function updateTotals() {
    // This function now works correctly with the numeric variables
    subTotalElement.innerText = `${subTotalValue}`;
    discountElement.innerText = `${discountValue.toFixed(2)}`;
    totalPriceElement.innerText = `${((subTotalValue - discountValue) + taxValue).toFixed(2)}`;
    tax.innerText = `${taxValue.toFixed(2)}`
}

function applyCoupon() {
    const couponCode = couponInput.value.trim().toUpperCase();
    
    // Always reset the discount and UI before starting a new check
    discountValue = 0;
    updateTotals();
    message.innerText = '';
    message.classList.remove('success', 'error');

    if (couponCode === '') {
        message.textContent = 'Please enter a coupon code.';
        message.classList.add('error');
        return;
    }

    const coupon = coupons[couponCode];
    if (!coupon) {
        message.textContent = 'Invalid coupon code.';
        message.classList.add('error');
        return;
    }

    if (new Date() > coupon.expires) {
        message.textContent = 'This coupon has expired.';
        message.classList.add('error');
        return;
    }

    // Now, we can use the numeric `subTotalValue` in the condition
    if (subTotalValue < coupon.minPurchase) {
        message.textContent = `This coupon requires a minimum purchase of $${coupon.minPurchase}.`;
        message.classList.add('error');
        return;
    }

    // Calculation logic
    if (coupon.type === "percentage") {
        discountValue = (subTotalValue * coupon.value) / 100;
    } else if (coupon.type === 'fixed') {
        discountValue = Number(coupon.value);
    } else if (coupon.type === 'free-shipping') {
        message.textContent = 'Free shipping applied!';
        message.classList.add('success');
        updateTotals();
        return;
    }

    // Ensure discount doesn't exceed the subtotal
    discountValue = Math.min(discountValue, subTotalValue);

    // Final UI update and success message
    updateTotals();
    message.textContent = 'Coupon applied successfully!';
    message.classList.add('success');
    localStorage.setItem('totalOrderValue',JSON.stringify(totalPriceElement.textContent))
    localStorage.setItem('discount',JSON.stringify(discountElement.innerText) )
    localStorage.setItem('subTotal',JSON.stringify(subTotalElement.innerText))
}

couponBtn.addEventListener('click', applyCoupon);
updateTotals();

const payBtn = document.querySelector('.pay-now-btn')
payBtn.addEventListener('click',function(){
window.location.href = 'payment.html'
})
 })