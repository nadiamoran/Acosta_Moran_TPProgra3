let carrito =
    JSON.parse(localStorage.getItem("carrito"))
    || [];

const contenedor =
    document.getElementById("carrito-container");

const totalHTML =
    document.getElementById("total");

function mostrarCarrito() {

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((producto, indice) => {

        total +=
            producto.precio *
            producto.cantidad;

        contenedor.innerHTML += `

        <div class="card">

            <h3>${producto.nombre}</h3>

            <p>Precio: $${producto.precio}</p>

            <p>Cantidad: ${producto.cantidad}</p>

            <button onclick="sumar(${indice})">
                +
            </button>

            <button onclick="restar(${indice})">
                -
            </button>

            <button onclick="eliminar(${indice})">
                Eliminar
            </button>

        </div>
        `;
    });

    totalHTML.textContent =
        `Total: $${total}`;

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );
}

function sumar(indice) {

    carrito[indice].cantidad++;

    mostrarCarrito();
}

function restar(indice) {

    if (carrito[indice].cantidad > 1) {

        carrito[indice].cantidad--;

    }

    mostrarCarrito();
}

function eliminar(indice) {

    carrito.splice(indice, 1);

    mostrarCarrito();
}

document
    .getElementById("btnFinalizar")
    .addEventListener("click", () => {

        if (carrito.length === 0) {

            alert("El carrito está vacío");
            return;
        }

        const confirmar =
            confirm(
                "¿Desea finalizar la compra?"
            );

        if (confirmar) {

            window.location.href =
                "ticket.html";
        }

    });

mostrarCarrito();