const cliente =
    localStorage.getItem("cliente");

document.getElementById("cliente")
.textContent = cliente;

const hoy = new Date();

document.getElementById("fecha")
.textContent =
    hoy.toLocaleDateString();

const productos =
    JSON.parse(
        localStorage.getItem("carrito")
    ) || [];

const contenedor =
    document.getElementById(
        "productos-ticket"
    );

let total = 0;

productos.forEach(producto => {

    const subtotal =
        producto.precio *
        producto.cantidad;

    total += subtotal;

    contenedor.innerHTML += `

    <div class="item-ticket">

        <p>${producto.nombre}</p>

        <p>
            Cantidad:
            ${producto.cantidad}
        </p>

        <p>
            Subtotal:
            $${subtotal}
        </p>

    </div>
    `;
});

document.getElementById(
    "total-ticket"
).textContent =
    `Total: $${total}`;

document
    .getElementById("btnPDF")
    .addEventListener("click", () => {

        const { jsPDF } =
            window.jspdf;

        const pdf = new jsPDF();

        pdf.text(
            "N&N Tech",
            20,
            20
        );

        pdf.text(
            "Cliente: " + cliente,
            20,
            40
        );

        pdf.text(
            "Total: $" + total,
            20,
            60
        );

        pdf.save(
            "ticket.pdf"
        );

    });

document
    .getElementById("btnSalir")
    .addEventListener("click", () => {

        localStorage.removeItem(
            "cliente"
        );

        localStorage.removeItem(
            "carrito"
        );

        window.location.href =
            "bienvenida.html";

    });