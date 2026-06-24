let carrito =
JSON.parse(
    localStorage.getItem("carrito")
) || [];

const contenedor =
document.getElementById(
    "carrito-container"
);

const totalHTML =
document.getElementById(
    "total"
);

async function mostrarCarrito(){

    const respuesta =
    await fetch(
        "http://localhost:3000/api/productos"
    );

    const productos =
    await respuesta.json();

    contenedor.innerHTML = "";

    let total = 0;

    if(carrito.length === 0){

        contenedor.innerHTML =
        "<p>Carrito vacío</p>";

        totalHTML.textContent =
        "Total: $0";

        return;
    }

    carrito.forEach((item,index)=>{

        const producto =
        productos.find(
            p => p.id == item.id
        );

        if(producto){

            total += producto.precio * item.cantidad;

            contenedor.innerHTML += `

            <div class="card">

                <img
                src="${producto.imagen}"
                width="150"
                >

                <h3>
                    ${producto.nombre}
                </h3>

                <p>
                    Categoría:
                    ${producto.categoria}
                </p>

                <p>
                    Precio:
                    $${producto.precio}
                </p>

                <p>
                    Cantidad:
                    ${item.cantidad}
                    </p>

                    <p>
                    Subtotal:
                    $${producto.precio * item.cantidad}
                </p>

                <button
                onclick="eliminar(${index})"
                >
                Eliminar
                </button>

            </div>

            <br>

            `;
        }

    });

    totalHTML.textContent =
    "Total: $" + total;

}

function eliminar(index){

    carrito.splice(index,1);

    localStorage.setItem(
        "carrito",
        JSON.stringify(carrito)
    );

    mostrarCarrito();

}

document
.getElementById(
    "btnFinalizar"
)
.addEventListener(
    "click",
    ()=>{

        if(carrito.length === 0){

            alert(
                "Carrito vacío"
            );

            return;
        }

        window.location.href =
        "ticket.html";

    }
);

mostrarCarrito();