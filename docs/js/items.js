const btn = document.getElementById('btn')
const menu = document.querySelector('.header')

btn.addEventListener('click', function() {
    menu.classList.toggle('is-active')

const isactive = menu.classList.contains('is-active')

btn.setAttribute('aria-expanded', isactive)
if(!isactive){
    menu.style.content = "none"
}
else{
    menu.style.content = "block"
}
})

// let data = document.getElementById('data')
// data.textContent = 29;

