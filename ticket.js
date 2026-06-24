const cliente =
    localStorage.getItem("cliente");

const carrito =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

const fecha =
    new Date();

const fechaHora =
    fecha.toLocaleString();

const numeroTicket =
    String(Date.now()).slice(-8);

const contenedor =
    document.getElementById(
        "productos-ticket"
    );


let subtotalGeneral = 0;

let productosVenta = [];

async function cargarTicket() {

    const respuesta =
        await fetch(
            "http://localhost:3000/api/productos"
        );

    const productos =
        await respuesta.json();

    document.getElementById(
        "cliente"
    ).textContent = cliente;

    document.getElementById(
        "fecha"
    ).textContent =
        fecha.toLocaleDateString();

    contenedor.innerHTML = "";

    carrito.forEach(item => {

        const producto =
            productos.find(
                p => p.id == item.id
            );

        if (producto) {

            const subtotal =
                producto.precio *
                item.cantidad;

            subtotalGeneral +=
                subtotal;

            productosVenta.push({

                nombre:
                    producto.nombre,

                precio:
                    producto.precio,

                cantidad:
                    item.cantidad

            });

            contenedor.innerHTML += `
            <br>
            <p>
            ${producto.nombre}
            - $${producto.precio.toLocaleString()} 
            x
            ${item.cantidad}
            =
            $${subtotal.toLocaleString()}
            </p>
            <br>
            `;
        }

    });

    document.getElementById(
        "total-ticket"
    ).textContent = 
    

        "Total: $" +

        subtotalGeneral.toLocaleString();
        

}

cargarTicket();

// FACTURA pdf


document.getElementById("btnPDF").addEventListener("click", async () => {

    const respuesta = await fetch("http://localhost:3000/api/generar-pdf", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            cliente,
            fecha: fechaHora,
            total: subtotalGeneral,
            productos: productosVenta
        })
    });

    if (!respuesta.ok) {
        alert("Error generando PDF");
        return;
    }

    const blob = await respuesta.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = "ticket.pdf";

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

    const mensaje =
            document.getElementById("mensaje");

        mensaje.textContent =
            "✔ Factura generada correctamente";

        mensaje.style.display =
            "block";

        setTimeout(() => {

            mensaje.style.display =
                "none";

        }, 5000);


//GUARDAR VENTAS

    fetch(
        "http://localhost:3000/api/ventas",
        {
            method: "POST",
            headers: {
                "Content-Type":
                    "application/json"
            },
            body: JSON.stringify({
                cliente: cliente,
                fecha: fechaHora,
                total: subtotalGeneral,
                productos: productosVenta
            })
        }
    );

});



// SALIR

document.getElementById("btnSalir").addEventListener("click", () => {

    localStorage.removeItem("cliente");
    localStorage.removeItem("carrito");

    window.location.href = "bienvenida.html";
});