document
.getElementById("btnTester")
.addEventListener(
    "click",
    () => {

        document
        .getElementById("email")
        .value =
        "admin@nntech.com";

        document
        .getElementById("password")
        .value =
        "123456";

    }
);

document
.getElementById("btnLogin")
.addEventListener(
    "click",
    async () => {

        const usuario =
        document
        .getElementById("email")
        .value;

        const password =
        document
        .getElementById("password")
        .value;

        try{

            const respuesta =
            await fetch(
                "http://localhost:3000/api/login",
                {
                    method:"POST",

                    headers:{
                        "Content-Type":
                        "application/json"
                    },

                    body: JSON.stringify({

                        usuario,
                        password

                    })

                }
            );

            const datos =
            await respuesta.json();

            if(respuesta.ok){

                localStorage.setItem(
                    "usuario",
                    usuario
                );

                window.location.href =
                "dashboard.html";

            }
            else{

                alert(
                    datos.mensaje
                );

            }

        }
        catch(error){

            console.error(error);

            alert(
                "Error al conectar con el servidor"
            );

        }

    }
);