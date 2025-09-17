document.addEventListener('DOMContentLoaded',()=>{
    let slides = document.querySelectorAll('.slide')
    const leftBtn = document.querySelector('.slider-btn.left')
    const rightBtn = document.querySelector('.slider-btn.right')
    const dotsContainer = document.querySelector('#dots')
    let currentIndex = 0

   

  slides.forEach((_,index) => {
    let dot = document.createElement('span')
   dot.classList.add('dot')
    if(index === 0) dot.classList.add('active')
        dot.addEventListener('click',() => showSlide(index))
        dotsContainer.appendChild(dot)
  })

  let dots = document.querySelectorAll('.dot')


  function showSlide(index){
  if(index < 0) index = slides.length - 1
  if(index >= slides.length) index = 0
  slides.forEach(slide => slide.classList.remove('active'))
  dots.forEach(dot => dot.classList.remove('active'))
  slides[index].classList.add('active')
  dots[index].classList.add('active')
  currentIndex = index
  }
  leftBtn.addEventListener('click',()=>{
    showSlide(currentIndex - 1)
  })
  rightBtn.addEventListener('click',()=>{
    showSlide(currentIndex + 1)
  })
  
 setInterval(()=>{
currentIndex++
if(currentIndex >= slides.length) currentIndex = 0
showSlide(currentIndex)
 },4000)
   
})


// Add to cart function

document.addEventListener('DOMContentLoaded',()=>{
const name = document.querySelectorAll('.item-name')
const price = document.querySelectorAll('.item-price')
const addBtn = document.querySelectorAll('.add-btn')
let cartNum = document.querySelector('#count')
let cartCont = document.querySelector('.cart-Container')
cartCont.classList.add('hidden')



  const text = cartNum.textContent
  const num = parseInt(text,10)


if(!cartNum){
  console.error('cart number not found')
  return
}

// localStorage 
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []
cartNum.textContent = cartItems.reduce((total,item) => total + item.quantity,0)


const btns = `<div class="quantity-selector"><button class="decrease">-</button><input type="text" class="quantity-input" value="1" min="0" readonly ><button class="increase">+</button></div>`

document.addEventListener('click',(event)=>{
  
  let target = event.target
  // Add to cart

  if(target.matches('.add-btn')){
    cartCont.classList.remove('hidden')
    const card = target.closest('.item-card')

     if (!card) {
      console.error("Card container not found");
      return;
    }
  

    const nameElement = card.querySelector('.item-name')
    const priceElement = card.querySelector('.item-price')
    if (!nameElement || !priceElement) {
        console.error("Missing .name or .price in card");
        return;
        }
        
        const name = nameElement.textContent.trim()
        const priceText = priceElement.textContent.replace('$',"").trim()
        const price = parseFloat(priceText)

        target.outerHTML = btns
        cartItems.push({name,price,quantity:1})
        cartCont.classList.remove('hidden')
        saveCart()
        updateTotalCartNumber()
}

const selector = target.closest('.quantity-selector')
if(!selector) return

const quantityInput = selector.querySelector('.quantity-input')
const card = selector.closest('.item-card')
if(!card || !quantityInput) return
const name = card.querySelector('.item-name')?.textContent.trim()
const cartItem = cartItems.find(item => item.name===name)
    if (!cartItem) {
    console.error("Cart item not found for:", name);
    return;
    }

    if(target.matches(".increase")){
      quantityInput.value++;
      cartItem.quantity++
    }

    if(target.matches(".decrease")){
      quantityInput.value--;
      cartItem.quantity--
    }

    if(Number(quantityInput.value) <= 0){
      selector.outerHTML = `<button class="add-btn">Add to cart </button>`
      cartItems = cartItems.filter(item => item.name !== name)
    }
      
    
      saveCart();
      updateTotalCartNumber();

      function updateTotalCartNumber(){
        const total = cartItems.reduce((sum,item) => sum + item.quantity ,0)
        cartNum.textContent = total
      }

      function saveCart(){
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
        console.log("Cart updated:", cartItems);
      }


})
     const goNextBtn = document.getElementById('cart-btn')

  goNextBtn.addEventListener('click',function(){
        window.location.href = 'checkout.html'
      })
})


