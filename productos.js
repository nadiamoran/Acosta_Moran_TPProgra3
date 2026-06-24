const hardware =
document.getElementById("hardware");

const software =
document.getElementById("software");

fetch("http://localhost:3000/api/productos")
.then(res => res.json())
.then(productos => {
    console.log(productos);

    mostrarProductos(
    productos.filter(
        p => p.activo
    )
);

})
.catch(error => {

    console.log(error);

});

function mostrarProductos(productos){

    hardware.innerHTML = "";
    software.innerHTML = "";

    productos
.filter(
    producto => producto.activo
)
.forEach(producto => {

        const tarjeta = `

        <div class="card">

            <img
                src="${producto.imagen}"
                alt="${producto.nombre}"
                class="imagen-producto"
            >

            <h3>${producto.nombre}</h3>

            <p>${producto.categoria}</p>

            <p>$${producto.precio}</p>

            <button
                onclick="agregarCarrito(${producto.id}, '${producto.nombre}')"
            >
                Agregar al carrito
            </button>

        </div>

        `;

        if(producto.categoria === "Hardware"){

            hardware.innerHTML += tarjeta;

        }

        if(producto.categoria === "Software"){

            software.innerHTML += tarjeta;

        }

    });

}

function agregarCarrito(id,nombre){

    let carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    let productoExistente =
    carrito.find(
        item => item.id == id
    );

    if(productoExistente){

        productoExistente.cantidad++;

    }else{

        carrito.push({
            id:id,
            cantidad:1
        });

    }

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    /*alert("Producto agregado");*/
    const mensaje =
    document.getElementById("mensaje");

    mensaje.textContent =
    "✔" + nombre + " agregado al carrito";

    mensaje.style.display =
    "block";

    setTimeout(() => {

        mensaje.style.display =
        "none";

    }, 2000);

    function actualizarCarrito(){

    const carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

    const cantidad =
    carrito.reduce(
        (acum,item)=>
        acum + item.cantidad,
        0
    );

    document.getElementById(
        "btnCarrito"
    ).textContent =

    `🛒 Carrito (${cantidad})`;

}
actualizarCarrito();

}