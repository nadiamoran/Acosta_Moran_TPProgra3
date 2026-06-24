const cliente = localStorage.getItem("cliente");
const productos = JSON.parse(localStorage.getItem("carrito")) || [];

const fecha = new Date();
const fechaHora = fecha.toLocaleString();
const numeroTicket = String(Date.now()).slice(-8);

// RENDER EN PANTALLA

document.getElementById("cliente").textContent = cliente;
document.getElementById("fecha").textContent = fecha.toLocaleDateString();

const contenedor = document.getElementById("productos-ticket");

let subtotalGeneral = 0;

productos.forEach(p => {
    const subtotal = p.precio * p.cantidad;
    subtotalGeneral += subtotal;

    contenedor.innerHTML += `
        <br>
        <p>${p.nombre} x ${p.cantidad} = $${subtotal.toLocaleString()}</p>
        <br>
        
    `;
});

document.getElementById("total-ticket").textContent =

    "Total: $" + subtotalGeneral.toLocaleString();




// FACTURA pdf

document.getElementById("btnPDF").addEventListener("click", () => {

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    let y = 14;

    pdf.setFillColor(20, 20, 20);
    pdf.rect(0, 0, 220, 28, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);
    pdf.text("N&N TECH STORE", 105, 14, { align: "center" });
    pdf.setFontSize(9);
    pdf.setFont("helvetica", "normal");
    pdf.text("Tecnología | Hardware | Software", 105, 22, { align: "center" });

    pdf.setTextColor(0, 0, 0);
    y = 40;

    // INFO TICKET

    pdf.setFontSize(10);

    pdf.text(`Ticket #: ${numeroTicket}`, 14, y);
    pdf.text(`Fecha: ${fechaHora}`, 14, y + 6);
    pdf.text(`Cliente: ${cliente}`, 14, y + 12);

    y += 22;

    pdf.line(14, y, 196, y);

    y += 10;

    pdf.setFont("helvetica", "bold");
    pdf.text("Producto", 14, y);
    pdf.text("Cant.", 130, y);
    pdf.text("Subtotal", 165, y);

    pdf.setFont("helvetica", "normal");

    y += 4;
    pdf.line(14, y, 196, y);

    //PRODUCTOS

    y += 8;

    productos.forEach(p => {

        const subtotal = p.precio * p.cantidad;

        pdf.text(p.nombre.substring(0, 35), 14, y);
        pdf.text(String(p.cantidad), 135, y);
        pdf.text(`$${subtotal.toLocaleString()}`, 165, y);

        y += 7;
    });

    y += 4;
    pdf.line(14, y, 196, y);

    //TOTALES

    const iva = subtotalGeneral * 0.21;
    const totalFinal = subtotalGeneral + iva;

    y += 10;

    pdf.setFont("helvetica", "normal");
    pdf.text(`Subtotal:`, 140, y);
    pdf.text(`$${subtotalGeneral.toLocaleString()}`, 165, y);

    y += 6;
    pdf.text(`IVA (21%):`, 140, y);
    pdf.text(`$${iva.toLocaleString()}`, 165, y);

    y += 10;

    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(13);

    pdf.text(`TOTAL:`, 140, y);
    pdf.text(`$${totalFinal.toLocaleString()}`, 165, y);

  
    y += 20;

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);

    pdf.text("Gracias por confiar en N&N Tech Store", 105, y, {
        align: "center"
    });

    y += 6;

    pdf.text("Soporte: soporte@nntech.com | +54 11 5555-5555", 105, y, {
        align: "center"
    });

    pdf.save(`NNTicket_${numeroTicket}.pdf`);
});



// SALIR

document.getElementById("btnSalir").addEventListener("click", () => {

    localStorage.removeItem("cliente");
    localStorage.removeItem("carrito");

    window.location.href = "bienvenida.html";
});