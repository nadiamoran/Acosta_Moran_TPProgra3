document
.getElementById("formProducto")
.addEventListener(
"submit",
async function(e){

    e.preventDefault();

    const producto = {

        nombre:
        document.getElementById("nombre").value,

        categoria:
        document.getElementById("categoria").value,

        precio:
        Number(
            document.getElementById("precio").value
        ),

        imagen:
        document.getElementById("imagen").value

    };

    await fetch(
        "http://localhost:3000/api/productos",
        {
            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:
            JSON.stringify(producto)
        }
    );

    alert("Producto agregado");

    window.location.href =
    "dashboard.html";

});