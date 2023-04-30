// Proyecto: Cotizaciones de viajes por continente

// Autor: Emilio Berber Maldonado 
// PRE-ENTREGA: 3

// REQUISITOS:
// 1) USAR DOM
// 2) USAR EVENTOS
// 3) USAR JSON & SOTRAGE
// Nota: Quitar prompts y alerts

// Array de paquetes por continente:
const arrayPaquetes = [
    {
        continente: "Europa",
        precioBase: 1500, //dolares por persona
        numPaises: 3,
        descripcion: "Este viaje te llevará a Francia, Inglaterra y España"
    },
    {
        continente: "América",
        precioBase: 1200, 
        numPaises: 3,
        descripcion: "Este viaje te llevará a Estados Unidos, México y Canadá"
    },
    {
        continente: "Asia",
        precioBase: 2000,
        numPaises: 2,
        descripcion: "Este viaje te llevará a Japón y China"
    },
    {
        continente: "Africa",
        precioBase: 850, 
        numPaises: 3,
        descripcion: "Este viaje te llevará a Sudáfrica, Nigeria y Marruecos"
    },
    {
        continente: "Oceanía",
        precioBase: 1400,
        numPaises: 2,
        descripcion: "Este viaje te llevará a Nueva Zelanda y Fiyi"
    }
]

/* 3) Implementación de JSON and Sotrage */
let cotizacion = JSON.parse(localStorage.getItem("cotizacion"))||[]

// Función para renderizar paquetes:
const paquetes = () =>{
    // 1) renderiza productos en el DOM
    const contenedorPaquetes = document.getElementById("contenedorPaquetes")
    arrayPaquetes.forEach(({continente, precioBase, numPaises, descripcion})=>{
        const paqueteCard = document.createElement("div")
        paqueteCard.innerHTML = `
            <div class="card" style="width: 18rem; id="paquetes">
                <img src="./media/imagen_cards.png" class="card-img-top" alt="${continente}">
                <div class="card-body">
                    <h1 class="card-title">${continente}</h1>
                    <p class="card-text">${descripcion}</p>
                    <br>
                    <span>Precio Base: $${precioBase} USD</span>
                    <br>
                    <span>Países: ${numPaises}</span>
                </div>
            </div>`
        contenedorPaquetes.appendChild(paqueteCard)
    })
}

// Función para cotizar de forma dinámica con un formulario
const cotizar = () =>{
    const btn = document.getElementById("btnCotizar")
    /* 2) Implementación de EVENTO: */
    btn.addEventListener("click", (e)=>{
        e.preventDefault()
        let continente = document.getElementById("inputGroupSelect01").value;
        if(continente === "Europa"){
            continente = 1500
        }else if (continente === "América"){
            continente = 1200
        }else if(continente === "Asia"){
            continente = 2000
        }else if(continente === "Africa"){
            continente = 850
        }else if(continente === "Oceanía"){
            continente = 1400
        }

        const numPersonas = Number(document.getElementById("inputGroupSelect02").value);
    
        let cotPorNumPersonas = continente * numPersonas
        const agregarCot =()=>{
            cotizacion.push( {Precio :continente, Pasajeros: numPersonas, Total: cotPorNumPersonas} )
            console.log(cotizacion)
        }

        const totalCarritoRender = () =>{
            // se encarga de calcular el total del carrito
            const cotTotal = document.getElementById("total")
            agregarCot()
            cotTotal.innerHTML = `Precio total: $${cotPorNumPersonas} USD`
        }
        totalCarritoRender()

        const listaCotizacion = document.getElementById("listaCotizacion")
        listaCotizacion.innerHTML =""
        let elementoCot = document.createElement("p")
        elementoCot.innerHTML= `Precio: $ ${continente} USD<br>Pasajeros: ${numPersonas} `
        listaCotizacion.appendChild(elementoCot)

        // 3) Implementación de JSON and Sotrage
        let paqueteString = JSON.stringify(cotizacion)
        localStorage.setItem("Cotizacion", paqueteString)

        // Condicionales para que el usuario no pueda agregar menos de una persona
        if((numPersonas < 1)){
            const errorPersonas = document.getElementById("listaCotizacion")
            errorPersonas.innerHTML = ""
            const borrarTotal = document.getElementById("total")
            borrarTotal.innerHTML = ""
            let mensajeErrorPersonas = document.createElement("p")
            mensajeErrorPersonas.innerHTML = "Asegurate de agregar más de una persona"
            errorPersonas.appendChild(mensajeErrorPersonas)
        }
    })
}

// Llamado a las funciones principales
paquetes()
cotizar()
