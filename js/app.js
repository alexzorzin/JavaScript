let cart = []

const stockContainer = document.getElementById('stock-container');
const cartContainer = document.getElementById('cart-container');

const cartCounter = document.getElementById('product-counter');
const totalPrice = document.getElementById('totalPrice');
const URLJSON = "./assets/data/stock.json";

showStock();

function showStock() {
    $('#stock-container').append = '';

    $.getJSON(URLJSON, function (answer, status) {
        if (status === "success") {
            let stock = answer;
            for (const product of stock) {
                let div = document.createElement('div');
                div.classList.add('product');
                div.innerHTML += ` <div class="card">
                                    <div class="card-image">
                                        <img class="img-fluid" src=${product.img}>
                                        <p class="fw-normal card-title fs-4 ms-1">${product.name}</h4>
                                        <a id="btn${product.id}" class="btn-floating icon-cart-plus"></a>
                                    </div>
                                    <div class="card-content m-1">
                                        <p>${product.desc}</p>
                                        <p class="fw-bold">${product.Type}</p>
                                        <p> AR$ ${product.Price}</p>
                                    </div>
                                </div> `

                $('#stock-container').append(div);

                let btn = document.getElementById(`btn${product.id}`)

                $(document).ready(function () {
                    $(btn).click(function () {
                        addToCart(product.id);
                        toastr["success"](" ", `You have added ${product.name} to the cart`);
                    });

                    toastr.options = {
                        "closeButton": false,
                        "debug": false,
                        "newestOnTop": false,
                        "progressBar": false,
                        "positionClass": "toast-top-right",
                        "preventDuplicates": false,
                        "onclick": null,
                        "positionClass": "toast-bottom-right",
                        "showDuration": "300",
                        "hideDuration": "1000",
                        "timeOut": "5000",
                        "extendedTimeOut": "1000",
                        "showEasing": "swing",
                        "hideEasing": "linear",
                        "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                })
            }

        }
    })
}

function addToCart(id) {
    let repeated = cart.find(prodR => prodR.id == id);
    if (repeated) {
        repeated.Quantity = repeated.Quantity + 1;
        $(`#Quantity${repeated.id}`).html(`Quantity: ${repeated.Quantity}`)
        updateCart()
    } else {
        $.getJSON(URLJSON, function (answer, status) {
            if (status === "success") {
                let stock = answer;
                let addProduct = stock.find(prod => prod.id == id);

                cart.push(addProduct);

                addProduct.Quantity = 1;

                updateCart()

                $('#cart-container').append(`<div class="productOnCart row">
                <div class="col-3 z-index-3">
                <p>${addProduct.name}</p>
                </div>
                <div class="col-3 z-index-3">
                <p>Price: $${addProduct.Price}</p>
                </div>
                <div class="col-3 z-index-3">
                <p id="Quantity${addProduct.id}">Quantity: ${addProduct.Quantity}</p>
                </div>
                <button id="delete${addProduct.id}" class="col-1 delete-btn"><i class="fas fa-trash-alt"></i></button>
                <button id="substractCart${addProduct.id}" class="col-1 delete-btn">-</button>
                <button id="addCart${addProduct.id}" class="col-1 delete-btn">+</button>
                </div>`)

                //BOTON ELIMINAR
                let deleteBtn = document.getElementById(`delete${addProduct.id}`)

                deleteBtn.addEventListener('click', () => {
                    deleteBtn.parentElement.remove()
                    cart = cart.filter(prodE => prodE.id != addProduct.id)
                    updateCart()
                    toastr["warning"](toastr["warning"](`You have succesfully removed ${addProduct.name} from the cart`));
                })

                //BOTON SUMAR
                let addCart = document.getElementById(`addCart${addProduct.id}`)
                $(addCart).click(() => {
                    addToCart(addProduct.id);
                    console.log(addProduct);
                    toastr["success"](`You have added ${addProduct.name}`);
                })

                //RESTAR
                let substractCart = document.getElementById(`substractCart${addProduct.id}`)

                $(substractCart).click(() => {
                    substractFromCart(addProduct.id)
                });

            }
        });
    }
}

function substractFromCart(id) {
    let repeated = cart.find(prodR => prodR.id == id);

    if (repeated.Quantity > 1) {
        repeated.Quantity = repeated.Quantity - 1;
        document.getElementById(`Quantity${repeated.id}`).innerHTML = `<p id="Quantity${repeated.id}">Quantity: ${repeated.Quantity}</p>`;
        updateCart();
    }
    else {
        repeated.Quantity = 0;
        $.getJSON(URLJSON, function (answer, status) {
            if (status === "success") {
                let stock = answer;
                let addProduct = stock.find(prod => prod.id == id)
                let substractCart = document.getElementById(`substractCart${addProduct.id}`)
                substractCart.parentElement.remove()
                cart = cart.filter(prodE => prodE.id != addProduct.id)
                updateCart();
                toastr["warning"](`You have succesfully removed ${addProduct.name} from the cart`);
            }
        })
    }
}

// VACIAR CARRITO
$('#btn-empty').click(() => {
    $('.productOnCart').remove();
    cart = [];
    updateCart();
    toastr["success"]("You have emptied the cart");
})


function updateCart() {
    var productCounter = cartCounter.innerText = cart.reduce((acc, el) => acc + el.Quantity, 0);
    totalPrice.innerText = cart.reduce((acc, el) => acc + (el.Price * el.Quantity), 0)
    if (productCounter === 0) {
        $(".cart-btns").css({ "display": "none" });
    }
    else{
        $(".cart-btns").css({ "display": "initial" });
    }
    saveLocal()
}

function saveLocal() {
    localStorage.setItem("products", JSON.stringify(cart))
}

function getLocal() {
    let cartStoraged = JSON.parse(localStorage.getItem("products"));

    if (cartStoraged) {
        cartStoraged.forEach(el => {
            cart.push(el)
            updateCart()

            let div = document.createElement("div");
            div.classList.add('productOnCart', 'row');
            div.innerHTML += 
                    `<div class="col-3 z-index-3">
                    <p>${el.name}</p>
                    </div>
                    <div class="col-3 z-index-3">
                    <p>Price: $${el.Price}</p>
                    </div>
                    <div class="col-3 z-index-3">
                    <p id="Quantity${el.id}">Quantity: ${el.Quantity}</p>
                    </div>
                    <button id="delete${el.id}" class="col-1 delete-btn"><i class="fas fa-trash-alt"></i></button>
                    <button id="substractCart${el.id}" class="col-1 delete-btn">-</button>
                    <button id="addCart${el.id}" class="col-1 delete-btn">+</button>
                    </div>`

            cartContainer.appendChild(div);

            //BOTON ELIMINAR
            let deleteBtn = document.getElementById(`delete${el.id}`)

            deleteBtn.addEventListener('click', () => {
                deleteBtn.parentElement.remove()
                cart = cart.filter(prodE => prodE.id != el.id)
                updateCart()
                toastr["warning"](toastr["warning"](`You have succesfully removed ${el.name} from the cart`));
            })

            //BOTON SUMAR
            let addCart = document.getElementById(`addCart${el.id}`)
            $(addCart).click(() => {
                addToCart(el.id);
                console.log(el);
                toastr["success"](`You have added ${el.name}`);
            })

            //RESTAR
            let substractCart = document.getElementById(`substractCart${el.id}`)

            $(substractCart).click(() => {
                substractFromCart(el.id)
            })

        });
    }
}
getLocal();

const openCart = document.getElementById('cart-button');
const closeCart = document.getElementById('cartClose');

const modalContainer = document.getElementsByClassName('modal-container')[0]
const modalCart = document.getElementsByClassName('modal-cart')[0]

openCart.addEventListener('click', ()=> {
    modalContainer.classList.toggle('modal-active')
    $(".navbar").css({"display":"none"})
})
closeCart.addEventListener('click', ()=> {
    modalContainer.classList.toggle('modal-active')
    $(".navbar").css({"display":"initial"})
})
modalCart.addEventListener('click',(e)=>{
    e.stopPropagation()
})
modalContainer.addEventListener('click', ()=>{
    closeCart.click()
})

const modalContainer2 = $('.modal-container2')[0];

$('#finish-btn').click(() => {
    modalContainer.classList.toggle('modal-active');
    modalContainer2.classList.toggle('modal-active2');
})

$('#closeCart2').click(() => {
    $(".navbar").css({"display":"initial"})
    modalContainer2.classList.toggle('modal-active2');
});

$('.modal-cart2').click((e) => {
    e.stopPropagation();
})

$('.modal-container2').click(() => {
    $('#closeCart2').trigger("click");
})

function checkoutPay() {
    window.addEventListener('load', function () {

        var forms = document.getElementsByClassName('needs-validation');

        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                else {
                    event.preventDefault();
                    event.stopPropagation();
                    console.log(cart);
                    $('.productOnCart').remove();
                    cart = [];
                    updateCart();
                    modalContainer2.classList.toggle('modal-active2');
                    toastr["success"]("Thanks for your payment! Our page grows when you buy here");
                    setTimeout(() => { location.reload() }, 2000);
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
}

checkoutPay();