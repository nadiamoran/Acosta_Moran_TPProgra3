const tablaProductos =
document.getElementById("tabla-productos");

fetch("http://localhost:3000/api/productos")
.then(res => res.json())
.then(productos => {
    console.log(productos);
    productos.forEach(p => {

        tablaProductos.innerHTML += `

<tr>

    <td>${p.id}</td>

    <td>${p.nombre}</td>

    <td>${p.categoria}</td>

    <td>$${p.precio}</td>

    <td>
        ${
            p.activo
            ? "🟢 Activo"
            : "🔴 Inactivo"
        }
    </td>

    <td>

        <button
            onclick="cambiarEstado(${p.id})"
        >
            ${
                p.activo
                ? "Desactivar"
                : "Activar"
            }
        </button>

    </td>

</tr>

`;

    });

});

async function eliminar(id){

    if(!confirm("Eliminar producto?"))
    return;

    await fetch(
        "http://localhost:3000/api/productos/" + id,
        {
            method:"DELETE"
        }
    );

    location.reload();

}

async function cambiarEstado(id){
    console.log("ID:", id);
    const respuesta =
    await fetch(

        "http://localhost:3000/api/productos/" +
        id +
        "/estado",

        {
            method:"PUT"
        }

    );

    const datos =
    await respuesta.json();

    console.log(datos);

    location.reload();

}