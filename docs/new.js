document.addEventListener('DOMContentLoaded',()=>{
    let slides = document.querySelectorAll('.slides')
    const leftBtn = document.querySelector('.slider-btn.left')
    const rightBtn = document.querySelector('.slider-btn.right')
    const dotsContainer = document.querySelector('#dots')
    let currentIndex = 0

   let dot = document.createElement('span')
   dot.classList.add('dots')
    dotsContainer.appendChild(dot)

    let dots = dotsContainer.querySelectorAll('.dots')
  slides.forEach((_,index) => {
    let dotss = dotsContainer.querySelectorAll('.dots')
    if(index === 0) dotss.classList.add('active')
        dotss.addEventListener('click',() => showSlide(index))
  })


  function showSlide(){
    if(index < 0) index = slides.length - 1
    if(index >= slides.length) index = 0
    slides.forEach(slide => slide.classList.add('hidden'))
    dots.forEach(dots => dots.classList.remove('active'))
    slides[index].classList.remove('hidden')
    dots[index].classList.add('active')
    currentIndex = index
  }
   
})