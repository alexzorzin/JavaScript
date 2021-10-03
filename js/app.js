let carritoDeCompras = []

const contenedorProductos = document.getElementById('contenedor-productos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const contadorCarrito = document.getElementById('contadorCarrito');
const precioTotal = document.getElementById('precioTotal');
const selecTipo = document.getElementById('selecTipo');

selecTipo.addEventListener('change', () => {
    console.log(selecTipo.value)
    if (selecTipo.value == 'all') {
        mostrarProductos(stockProductos)
    } else {
        mostrarProductos(stockProductos.filter(el => el.Tipo == selecTipo.value))
    }
})

mostrarProductos(stockProductos)

function mostrarProductos(array) {
    contenedorProductos.innerHTML = '';
    for (const producto of array) {
        let div = document.createElement('div');
        div.classList.add('producto');
        div.innerHTML += `<div class="card">
                            <div class="card-image">
                                <img class="img-fluid" src=${producto.img}>
                                <p class="fw-normal card-title fs-4 ms-1">${producto.nombre}</h4>
                                <a id="boton${producto.id}" class="btn-floating icon-cart-plus"></a>
                            </div>
                            <div class="card-content m-1">
                                <p>${producto.desc}</p>
                                <p>Tipo: ${producto.Tipo}</p>
                                <p> $${producto.Precio}</p>
                            </div>
                        </div> `
        contenedorProductos.appendChild(div);

        let boton = document.getElementById(`boton${producto.id}`)

        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id)
        })
    }

}

function agregarAlCarrito(id) {
    let repetido = carritoDeCompras.find(prodR => prodR.id == id);
    if (repetido) {
        repetido.Cantidad = repetido.Cantidad + 1;
        document.getElementById(`Cantidad${repetido.id}`).innerHTML = `<p id="Cantidad${repetido.id}">Cantidad: ${repetido.Cantidad}</p>`
        actualizarCarrito()
    } else {
        let productoAgregar = stockProductos.find(prod => prod.id == id);
        carritoDeCompras.push(productoAgregar);
        

        productoAgregar.Cantidad = 1;
        actualizarCarrito()
        let div = document.createElement('div');
        div.classList.add('productoEnCarrito');
        div.innerHTML = `<p>${productoAgregar.nombre}</p>
                        <p>Precio: ${productoAgregar.Precio}</p>
                        <p id="Cantidad${productoAgregar.id}">Cantidad: ${productoAgregar.Cantidad}</p>
                        <p>Tipo: ${productoAgregar.Tipo}</p>
                        <button id="eliminar${productoAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
        contenedorCarrito.appendChild(div);

        let botonEliminar = document.getElementById(`eliminar${productoAgregar.id}`)

        botonEliminar.addEventListener('click', () => {
            botonEliminar.parentElement.remove()
            carritoDeCompras = carritoDeCompras.filter(prodE => prodE.id != productoAgregar.id)
            actualizarCarrito()
        })
    }
}

function actualizarCarrito() {
    contadorCarrito.innerText = carritoDeCompras.reduce((acc, el) => acc + el.Cantidad, 0);
    precioTotal.innerText = carritoDeCompras.reduce((acc, el) => acc + (el.Precio * el.Cantidad), 0)
    guardarLocal()
}

function guardarLocal(){
    localStorage.setItem("productos", JSON.stringify(carritoDeCompras))
}

function obtenerLocal(){
    let carritoAlmacenado = JSON.parse(localStorage.getItem("productos")); 

    if(carritoAlmacenado){
        carritoAlmacenado.forEach(el => {
            carritoDeCompras.push(el)
            actualizarCarrito()

            let div = document.createElement("div");
            div.classList.add('productoEnCarrito');
            div.innerHTML += `<p>${el.nombre}</p>
            <p>Precio: ${el.Precio}</p>
            <p id="Cantidad${el.id}">Cantidad: ${el.Cantidad}</p>
            <p>Tipo: ${el.Tipo}</p>
            <button id="eliminar${el.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
        
            contenedorCarrito.appendChild(div);
            
            let botonEliminar = document.getElementById (`eliminar${el.id}`);
        
            botonEliminar.addEventListener ("click", () => {
                botonEliminar.parentElement.remove();
                carritoDeCompras = carritoDeCompras.filter(prodEliminado => prodEliminado.id != el.id);
                actualizarCarrito();
            })
        });
    }
}

obtenerLocal();