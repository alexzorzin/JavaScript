const openCart = document.getElementById('cart-button');
const closeCart = document.getElementById('cartClose');

const modalContainer = document.getElementsByClassName('modal-container')[0]
const modalCart = document.getElementsByClassName('modal-cart')[0]

openCart.addEventListener('click', ()=> {
    modalContainer.classList.toggle('modal-active')
})
closeCart.addEventListener('click', ()=> {
    modalContainer.classList.toggle('modal-active')
})
modalCart.addEventListener('click',(e)=>{
    e.stopPropagation()
})
modalContainer.addEventListener('click', ()=>{
    closeCart.click()
})