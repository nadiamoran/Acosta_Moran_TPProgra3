const productos =
JSON.parse(
localStorage.getItem("productos")
);

const id =
localStorage.getItem(
"productoDetalle"
);

const producto =
productos.find(
p=>p.id == id
);

document.getElementById(
"detalleProducto"
).innerHTML = `

<h2>${producto.nombre}</h2>

<img src="${producto.imagen}">

<p>${producto.descripcion}</p>

<p>Precio: $${producto.precio}</p>

<br>

<button onclick="agregarDetalle(${producto.id})">
Agregar al carrito
</button>

`;

function agregarDetalle(id){

let carrito =
JSON.parse(
localStorage.getItem("carrito")
)
|| [];

const existe =
carrito.find(p=>p.id===id);

if(existe){

existe.cantidad++;

}else{

carrito.push({
...producto,
cantidad:1
});

}

localStorage.setItem(
"carrito",
JSON.stringify(carrito)
);

alert("Producto agregado");

}