// LOGIN

const btnLogin =
    document.getElementById(
        "btnLogin"
    );

if (btnLogin) {

    btnLogin.addEventListener(
        "click",
        () => {

            const email =
                document.getElementById(
                    "email"
                ).value;

            const password =
                document.getElementById(
                    "password"
                ).value;

            if (
                email === "admin@nntech.com"
                &&
                password === "1234"
            ) {

                window.location.href =
                    "dashboard.html";

            } else {

                alert(
                    "Usuario o contraseña incorrectos"
                );

            }

        }
    );

}

// PRODUCTOS

let productosAdmin =
    JSON.parse(
        localStorage.getItem(
            "productosAdmin"
        )
    )
    || [];

// EDITAR

const indiceEditar =
    localStorage.getItem(
        "editarProducto"
    );

const btnGuardar =
    document.getElementById(
        "btnGuardar"
    );

if (
    btnGuardar &&
    indiceEditar !== null
) {

    document.getElementById(
        "tituloFormulario"
    ).textContent =
        "Modificar Producto";

    document.getElementById(
        "nombre"
    ).value =
        productosAdmin[indiceEditar]
            .nombre;

    document.getElementById(
        "categoria"
    ).value =
        productosAdmin[indiceEditar]
            .categoria;

    document.getElementById(
        "precio"
    ).value =
        productosAdmin[indiceEditar]
            .precio;

}

// GUARDAR

if (btnGuardar) {

    btnGuardar.addEventListener(
        "click",
        () => {

            const nombre =
                document.getElementById(
                    "nombre"
                ).value;

            const categoria =
                document.getElementById(
                    "categoria"
                ).value;

            const precio =
                document.getElementById(
                    "precio"
                ).value;

            if (
                nombre === ""
                ||
                precio === ""
            ) {

                alert(
                    "Complete todos los campos"
                );

                return;

            }

            if (
                indiceEditar !== null
            ) {

                productosAdmin[indiceEditar]
                    .nombre = nombre;

                productosAdmin[indiceEditar]
                    .categoria = categoria;

                productosAdmin[indiceEditar]
                    .precio = precio;

                localStorage.removeItem(
                    "editarProducto"
                );

            } else {

                productosAdmin.push({

                    id: Date.now(),

                    nombre,

                    categoria,

                    precio,

                    activo: true

                });

            }

            localStorage.setItem(
                "productosAdmin",
                JSON.stringify(
                    productosAdmin
                )
            );

            alert(
                "Producto guardado"
            );

            window.location.href =
                "dashboard.html";

        }
    );

}

// TABLA

const tabla =
    document.getElementById(
        "tabla-productos"
    );

if (tabla) {

    productosAdmin.forEach(
        (producto, index) => {

            tabla.innerHTML += `

<tr>

<td>${producto.id}</td>

<td>${producto.nombre}</td>

<td>${producto.categoria}</td>

<td>$${producto.precio}</td>

<td>

${producto.activo ?
                    "Activo" :
                    "Inactivo"}

</td>

<td>

<button
onclick="editarProducto(${index})">

Editar

</button>

<button
onclick="cambiarEstado(${index})">

Estado

</button>

</td>

</tr>

`;

        }
    );

}

// EDITAR

function editarProducto(index) {

    localStorage.setItem(
        "editarProducto",
        index
    );

    window.location.href =
        "producto-form.html";

}

// BAJA LÓGICA

function cambiarEstado(index) {

    productosAdmin[index].activo =
        !productosAdmin[index].activo;

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(
            productosAdmin
        )
    );

    location.reload();

}

// CERRAR SESIÓN

const cerrar =
    document.getElementById(
        "cerrarSesion"
    );

if (cerrar) {

    cerrar.addEventListener(
        "click",
        () => {

            window.location.href =
                "login.html";

        }
    );

}