const express = require("express");

const fs = require("fs");
const path = require("path");

const bcrypt = require("bcrypt");

const app = express();

const puppeteer = require("puppeteer");

const PORT = 3000;

app.use(express.json());

app.use(express.static(__dirname));

function leerProductos(){

    const datos =
    fs.readFileSync(
        "productos.json",
        "utf8"
    );

    return JSON.parse(datos);

}

function guardarProductos(productos){

    fs.writeFileSync(
        "productos.json",
        JSON.stringify(
            productos,
            null,
            2
        )
    );

}

app.get("/", (req,res)=>{

    res.send("Servidor funcionando");

});

app.get("/api/productos",(req,res)=>{

    const productos =
    leerProductos();

    res.json(productos);

});


app.get("/api/productos/:id",(req,res)=>{

    const productos =leerProductos();

    const producto =
    productos.find(
        p => p.id == req.params.id
    );

    if(!producto){

        return res.status(404).json({
            mensaje:"Producto no encontrado"
        });

    }

    res.json(producto);

});

app.post("/api/productos",(req,res)=>{

    const productos =
    leerProductos();

    const nuevoProducto = {

        id: Date.now(),

        nombre:
        req.body.nombre,

        categoria:
        req.body.categoria,

        precio:
        req.body.precio,

        activo:true

    };

    productos.push(
        nuevoProducto
    );

    guardarProductos(
        productos
    );

    res.status(201).json(
        nuevoProducto
    );

});


app.put("/api/productos/:id",(req,res)=>{

    const productos =
    leerProductos();

    const index =
    productos.findIndex(
        p => p.id == req.params.id
    );

    if(index === -1){

        return res.status(404).json({
            mensaje:"Producto no encontrado"
        });

    }

    productos[index].nombre =
    req.body.nombre;

    productos[index].categoria =
    req.body.categoria;

    productos[index].precio =
    req.body.precio;

    guardarProductos(
        productos
    );

    res.json(
        productos[index]
    );

});


app.put("/api/productos/:id",(req,res)=>{

    const productos =
    leerProductos();

    const producto =
    productos.find(
        p => p.id == req.params.id
    );

    if(!producto){

        return res.status(404).json({
            mensaje:"Producto no encontrado"
        });

    }

    producto.activo =
    !producto.activo;

    guardarProductos(
        productos
    );

    res.json(producto);

});

function leerVentas(){

    const datos =
    fs.readFileSync(
        "ventas.json",
        "utf8"
    );

    return JSON.parse(datos);

}

function guardarVentas(ventas){

    fs.writeFileSync(
        "ventas.json",
        JSON.stringify(
            ventas,
            null,
            2
        )
    );

}

function leerUsuarios(){

    const datos =
    fs.readFileSync(
        "usuarios.json",
        "utf8"
    );

    return JSON.parse(datos);

}

function guardarUsuarios(usuarios){

    fs.writeFileSync(
        "usuarios.json",
        JSON.stringify(
            usuarios,
            null,
            2
        )
    );

}


app.post("/api/ventas",(req,res)=>{

    const ventas =
    leerVentas();

    const nuevaVenta = {

        id: Date.now(),

        cliente:
        req.body.cliente,

        fecha:
        req.body.fecha,

        total:
        req.body.total,

        productos:
        req.body.productos

    };

    ventas.push(
        nuevaVenta
    );

    guardarVentas(
        ventas
    );

    res.json({

        mensaje:
        "Venta guardada",

        venta:
        nuevaVenta

    });

});

app.get("/api/ventas",(req,res)=>{

    const ventas =
    leerVentas();

    res.json(
        ventas
    );

});


const carpetaPDFs =
path.join(__dirname, "pdfs");

if (!fs.existsSync(carpetaPDFs)) {

    fs.mkdirSync(carpetaPDFs);

}

app.use(
    "/pdfs",
    express.static(
        path.join(__dirname, "pdfs")
    )
);

app.post(
    "/api/generar-ticket",
    async (req,res)=>{

        const venta =
        req.body;

        const browser =
        await puppeteer.launch();

        const page =
        await browser.newPage();

        let html = `

        <html>

        <head>

        <style>

        body{
            font-family:Arial;
            padding:30px;
        }

        h1{
            text-align:center;
        }

        table{
            width:100%;
            border-collapse:collapse;
        }

        th,
        td{
            border:1px solid black;
            padding:8px;
        }

        </style>

        </head>

        <body>

        <h1>N&N TECH</h1>

        <p>
        Cliente:
        ${venta.cliente}
        </p>

        <p>
        Fecha:
        ${venta.fecha}
        </p>

        <hr>

        <table>

        <tr>

            <th>Producto</th>
            <th>Cantidad</th>
            <th>Subtotal</th>

        </tr>

        `;

        venta.productos.forEach(p=>{

            html += `

            <tr>

                <td>${p.nombre}</td>

                <td>${p.cantidad}</td>

                <td>
                $
                ${(
                    p.precio *
                    p.cantidad
                ).toLocaleString()}
                </td>

            </tr>

            `;

        });

        html += `

        </table>

        <br>

        <h2>

        Total:

        $
        ${venta.total.toLocaleString()}

        </h2>

        </body>

        </html>

        `;

        await page.setContent(html);
        console.log(html.includes("data:image/png;base64"));
        const pdf =
        await page.pdf({

            format:"A4"

        });

        await browser.close();

        res.set({

            "Content-Type":
            "application/pdf",

            "Content-Disposition":
            "attachment; filename=ticket.pdf"

        });

        res.send(pdf);

    }
);

app.post(
    "/api/generar-pdf",
    async (req,res) => {

        const venta =
        req.body;

        const fs =
        require("fs");

        let html =
        fs.readFileSync(
            "ticket-pdf.html",
            "utf8"
        );

        const logoBase64 = fs.readFileSync(
            path.join(__dirname, "logo-2.png"),
            "base64"
        );

        const logo = `data:image/png;base64,${logoBase64}`;

        let filas = "";

        venta.productos.forEach(p => {

            filas += `

<tr>

<td>${p.nombre}</td>

<td>${p.cantidad}</td>

<td>$${p.precio}</td>

<td>$${p.precio * p.cantidad}</td>

</tr>

`;

        });

        html =
        html.replace(
            "{{CLIENTE}}",
            venta.cliente
        );

        html =
        html.replace(
            "{{FECHA}}",
            venta.fecha
        );

        html =
        html.replace(
            "{{PRODUCTOS}}",
            filas
        );

        html =
        html.replace(
            "{{TOTAL}}",
            venta.total.toLocaleString()
        );

        const browser =
        await puppeteer.launch();

        const page =
        await browser.newPage();

        html = html.replace(
            'src="logo-2.png"',
            `src="${logo}"`
        );

        await page.setContent(
            html,
            {
                waitUntil: "networkidle0"
            }
        );

        const archivo =
            path.join(
                carpetaPDFs,
                `ticket_${Date.now()}.pdf`
            );

        const pdfBuffer = await page.pdf({

            path: archivo,

            format: "A4",

            printBackground: true

        });

        await browser.close();

        res.setHeader(
            "Content-Type",
            "application/pdf"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="ticket.pdf"'
        );

        res.send(pdfBuffer);

            }
        );

app.put(
    "/api/productos/:id/estado",
    (req,res)=>{

        const productos =
        leerProductos();

        const producto =
        productos.find(
            p => p.id == req.params.id
        );

        if(!producto){

            return res.status(404).json({
                mensaje:"Producto no encontrado"
            });

        }

        producto.activo =
        !producto.activo;

        guardarProductos(
            productos
        );

        res.json(producto);

    }
);


app.post(
    "/api/usuarios",
    async (req,res)=>{

        const usuarios =
        leerUsuarios();

        const passwordEncriptada =
        await bcrypt.hash(
            req.body.password,
            10
        );

        const nuevoUsuario = {

            id: Date.now(),

            usuario:
            req.body.usuario,

            password:
            passwordEncriptada

        };

        usuarios.push(
            nuevoUsuario
        );

        guardarUsuarios(
            usuarios
        );

        res.json({

            mensaje:
            "Usuario creado"

        });

    }
);

app.post(
    "/api/login",
    async (req,res)=>{

        const usuarios =
        leerUsuarios();

        const usuario =
        usuarios.find(
            u =>
            u.usuario ===
            req.body.usuario
        );

        if(!usuario){

            return res.status(401).json({
                mensaje:
                "Usuario incorrecto"
            });

        }

        const coincide =
        await bcrypt.compare(

            req.body.password,

            usuario.password

        );

        if(!coincide){

            return res.status(401).json({
                mensaje:
                "Contraseña incorrecta"
            });

        }

        res.json({

            mensaje:
            "Login correcto"

        });

    }
);



app.listen(PORT, ()=>{

    console.log(
        "Servidor iniciado en puerto " + PORT
    );

});

