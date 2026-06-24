const express = require("express");

const fs = require("fs");
const bcrypt = require("bcrypt");

const app = express();

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

app.listen(PORT, ()=>{

    console.log(
        "Servidor iniciado en puerto " + PORT
    );

});

