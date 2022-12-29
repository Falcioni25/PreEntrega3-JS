
productos = [
  { id: 0, nombre: "Silla", color: "Negro", precio: 15000, imgUrl: "img/silla.jpg" },
  { id: 1, nombre: "Mesa", color: "Nogal", precio: 150000, imgUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQabReG75CKxQnRzeM0KWmRh8HFKnI9O47F_izRzYg_vNOaFt51vTGsHZDSIK35O-bgHf8&usqp=CAU" },
  { id: 2, nombre: "Sofá", color: "Gris", precio: 55000, imgUrl: "img/sofa.png" },
  { id: 3, nombre: "Chifonnier", color: "Caoba", precio: 55000, imgUrl: "img/chifonier.jpg" },
  { id: 4, nombre: "Velador", color: "Blanco", precio: 10000, imgUrl: "img/velador.png" },
  { id: 5, nombre: "Cama", color: "Cedro", precio: 15000, imgUrl: "img/cama.jpg" },
  { id: 6, nombre: "Cómoda", color: "Nogal", precio: 150000, imgUrl: "img/comoda.webp" },
  { id: 7, nombre: "Ropero", color: "Gris", precio: 55000, imgUrl: "img/ropero.jpg" },
  { id: 8, nombre: "Sommier", color: "Gris", precio: 55000, imgUrl: "img/Sommier.png" },
  { id: 9, nombre: "Colchon", color: "Gris", precio: 55000, imgUrl: "img/colchon.jfif" },
]
//-------------------------------------------------------------------------------------------------------
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













