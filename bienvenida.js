const boton =
document.getElementById("btnContinuar");

boton.addEventListener("click", () => {

    const nombre =
    document.getElementById("nombre").value;

    if(nombre.trim() === ""){

        const mensajedos =
            document.getElementById("mensajedos");

        mensajedos.textContent =
            "X Ingresar Nombre";
        mensajedos.style.display =
            "block";
        setTimeout(() => {
            mensajedos.style.display =
                "none";
        }, 2000);

        return;
    }

    localStorage.setItem(
        "cliente",
        nombre
    );

    window.location.href =
    "productos.html";

});