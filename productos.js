const productos = [

    {
        id: 1,
        nombre: "RTX 4060",
        categoria: "Hardware",
        precio: 450000,
        imagen: "https://picsum.photos/300?1",
        descripcion: "Placa de video RTX 4060."
    },

    {
        id: 2,
        nombre: "Ryzen 7",
        categoria: "Hardware",
        precio: 380000,
        imagen: "https://picsum.photos/300?2",
        descripcion: "Procesador AMD Ryzen 7."
    },

    {
        id: 3,
        nombre: "Windows 11 Pro",
        categoria: "Software",
        precio: 80000,
        imagen: "https://picsum.photos/300?3",
        descripcion: "Licencia Windows 11."
    },

    {
        id: 4,
        nombre: "Office 365",
        categoria: "Software",
        precio: 45000,
        imagen: "https://picsum.photos/300?4",
        descripcion: "Paquete Office."
    }

];

localStorage.setItem(
    "productos",
    JSON.stringify(productos)
);

const cliente =
    localStorage.getItem("cliente");

const saludo =
    document.getElementById("saludo");

if (saludo) {

    saludo.textContent =
        "Bienvenido/a " + cliente;

}

let carrito =
    JSON.parse(localStorage.getItem("carrito"))
    || [];

const hardware =
    document.getElementById("hardware");

const software =
    document.getElementById("software");

productos.forEach(producto => {

    const tarjeta = `

<div class="producto">

<img src="${producto.imagen}">

<h4>${producto.nombre}</h4>

<p>$${producto.precio}</p>

<button onclick="verDetalle(${producto.id})">
Ver detalle
</button>

<button onclick="agregarProducto(${producto.id})">
Agregar
</button>

</div>

`;

    if (producto.categoria === "Hardware") {

        hardware.innerHTML += tarjeta;

    } else {

        software.innerHTML += tarjeta;

    }

});

function agregarProducto(id) {

    const producto =
        productos.find(p => p.id === id);

    const existe =
        carrito.find(p => p.id === id);

    if (existe) {

        existe.cantidad++;

    } else {

        carrito.push({
            ...producto,
            cantidad: 1
        });

    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    alert("Producto agregado");

}

function verDetalle(id) {

    localStorage.setItem(
        "productoDetalle",
        id
    );

    window.location.href =
        "detalle-producto.html";

}