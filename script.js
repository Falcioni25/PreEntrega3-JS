
fetch("data.json")
  .then(response => response.json())
  .then(productos => miPrograma(productos))


//-------------------------------------------------------------------------------------------------------
function miPrograma(productos){
let carrito = []
if (localStorage.getItem("carrito")) {
  carrito = JSON.parse(localStorage.getItem("carrito"))
}
//---------------------------------RENDERIZADOR DE PRODUCTOS---------------------------------------------------
for (const producto of productos) {
  const item = document.createElement("div");
  item.innerHTML = `<h3>${producto.nombre}</h3>
    <p> Color: ${producto.color}</p>
    <p> Precio: $ ${producto.precio}</p>
    <img src=${producto.imgUrl}>
    <button class="boton" id=${producto.id}>Añadir al carrito</button>
    `
  contenedorProductos.append(item)
  item.classList.add("producto")
}
//---------------------------RENDERIZADOR DE PRODUCTOS CUANDO FILTRO-------------------------------------------

function renderizarProductos(arrayDeProductos) {
  contenedorProductos.innerHTML = ""
  for (const producto of arrayDeProductos) {
    const productoBuscado = document.createElement("div");
    productoBuscado.className = "producto"
    productoBuscado.id = producto.id
    productoBuscado.innerHTML = `
      <h3>${producto.nombre}</h3>
      <p>Color: ${producto.color}</p>
      <p>Precio: $${producto.precio}</p>
      <img src=${producto.imgUrl}>
      <button class="boton" id=${producto.id}>Añadir al carrito</button>
    `
    contenedorProductos.appendChild(productoBuscado)

  }
  let botones = document.getElementsByClassName("boton")
  for (const boton of botones) {
    boton.addEventListener("click", agregarAlCarrito)
  }
}

//---------------------------BOTONES PARA AGREGAR AL CARRITO-----------------------------------------
let botones = document.getElementsByClassName("boton")
for (const boton of botones) {
  boton.addEventListener("click", agregarAlCarrito)
}
function agregarAlCarrito(e) {
  let productoBuscado = productos.find(producto => producto.id == e.target.id)
  let posicionDelProductoBuscado = carrito.findIndex(producto => producto.id == productoBuscado.id)
  if (posicionDelProductoBuscado != -1) {
    carrito[posicionDelProductoBuscado].unidades++
    carrito[posicionDelProductoBuscado].subtotal = carrito[posicionDelProductoBuscado].unidades * carrito[posicionDelProductoBuscado].precioUnitario
  } else {
    carrito.push({ id: productoBuscado.id, nombre: productoBuscado.nombre, precioUnitario: productoBuscado.precio, unidades: 1, subtotal: productoBuscado.precio })
  }
  localStorage.setItem("carrito", JSON.stringify(carrito))
  renderizarCarrito(carrito)
  Toastify({
    text: "Producto agregado al carrito",
    duration: 2000,
    position: "right",
    style: {
      background: "linear-gradient(to right, tomato, red)",
    }
  }).showToast();
}

//-------------------------Creador de Carrito-------------------------------------------------  
function renderizarCarrito(arrayDeProductos) {
  contenedorCarrito.innerHTML = ''
  for (const producto of arrayDeProductos) {
    contenedorCarrito.innerHTML += `
        <div class="flex">
          <p>${producto.nombre}</p>
          <p>$${producto.precioUnitario}</p>
          <p>${producto.unidades}u.</p>
          <p>$${producto.subtotal}</p>
        </div>
        
      `
  }
  let total = carrito.reduce((acc, valorActual) => acc + valorActual.subtotal, 0)
  contenedorCarrito.innerHTML += `
      <h5>TOTAL $${total}</h5>
      <button id="botonCarrito">Comprar</button>
    `

  let comprar = document.getElementById("botonCarrito")
  comprar.addEventListener("click", borrarCarrito)
}

//-----------------------BOTON COMPRAR-------------------------------

function borrarCarrito() {
  localStorage.removeItem("carrito")
  carrito = []
  renderizarCarrito(carrito)
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Gracias por su compra!',
    showConfirmButton: false,
    timer: 1500
  })
}


//----------------------------Buscador-------------------------------------------------------

const busqueda = document.querySelector("#input")

busqueda.addEventListener("input", filtrarProductos)


function filtrarProductos() {
  const productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().includes(busqueda.value.toLowerCase()))
  renderizarProductos(productosFiltrados)
}

function renderizarProductosFiltrados() {
  let productosFiltrados = productos.filter(producto => producto.nombre.toLowerCase().toUpperCase().includes(busqueda.value.toLowercase().toUpperCase()))
  renderizarProductos(productosFiltrados)
}
}












