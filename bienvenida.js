const boton = document.getElementById("btnContinuar");

boton.addEventListener("click", () => {

    const nombre = document.getElementById("nombre").value;

    if (nombre === "") {
        alert("Ingrese su nombre");
        return;
    }

    localStorage.setItem("cliente", nombre);

    window.location.href = "productos.html";
});