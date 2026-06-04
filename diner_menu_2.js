const MENSAJES_EXITO = [
    "¡Excelente elección! Marchando.",
    "¡Buenísimo! Ese plato es de los mejores.",
    "Oído cocina, anotado correctamente."
];

const MENSAJES_ERROR = [
    "Ups, ese plato no está en nuestra carta.",
    "Lo siento, no te he entendido. Escríbelo de nuevo.",
    "Error: Asegúrate de escribir el nombre tal y como aparece."
];

const MENUS = {
    desayuno: {
        primero: [ { nombre: "tostada con tomate", precio: 2.5 }, { nombre: "croissant", precio: 1.8 }, { nombre: "tortilla de patata", precio: 3.5 } ],
        segundo: [ { nombre: "huevos revueltos", precio: 4.0 }, { nombre: "tortitas con caramelo", precio: 4.5 }, { nombre: "sandwich mixto", precio: 3.0 } ],
        postre:  [ { nombre: "macedonia de fruta", precio: 2.5 }, { nombre: "yogur griego", precio: 2.0 }, { nombre: "zumo de naranja", precio: 2.2 } ],
        extras:  [ { nombre: "cafe", precio: 1.5 }, { nombre: "te verde", precio: 1.6 }, { nombre: "extra de bacon", precio: 1.2 } ]
    },
    almuerzo: {
        primero: [ { nombre: "ensalada cesar", precio: 6.5 }, { nombre: "crema de calabacin", precio: 5.5 }, { nombre: "gazpacho", precio: 5.0 } ],
        segundo: [ { nombre: "entrecot con patatas", precio: 14.5 }, { nombre: "salmon a la plancha", precio: 13.0 }, { nombre: "lasaña boloñesa", precio: 10.5 } ],
        postre:  [ { nombre: "tarta de queso", precio: 4.5 }, { nombre: "flan casero", precio: 3.5 }, { nombre: "helado de vainilla", precio: 3.0 } ], 
        extras:  [ { nombre: "patatas fritas", precio: 3.0 }, { nombre: "croquetas", precio: 4.5 }, { nombre: "nachos con queso", precio: 5.0 } ]
    },
    cena: {
        primero: [ { nombre: "sopa de picadillo", precio: 5.0 }, { nombre: "verduras salteadas", precio: 6.0 }, { nombre: "provolone fundido", precio: 6.5 } ],
        segundo: [ { nombre: "hamburguesa gourmet", precio: 11.5 }, { nombre: "tacos de pollo", precio: 9.5 }, { nombre: "pizza margarita", precio: 9.0 } ],
        postre:  [ { nombre: "brownie con helado", precio: 5.0 }, { nombre: "sorbete de limon", precio: 3.5 }, { nombre: "fruta del tiempo", precio: 2.0 } ],
        extras:  [ { nombre: "aros de cebolla", precio: 3.5 }, { nombre: "pan de ajo", precio: 2.8 }, { nombre: "boniatos fritos", precio: 3.2 } ]
    }
};

// Dar la HORA

function obtenerHoraValida() {
    let hora;
    let esValida = false;

    do {
        try {
            let horaUsuario = prompt("Por favor, dinos la hora actual en formato HH:MM (ej: 14:30):");

            // Usuario pulsa "Cancelar"
            if (horaUsuario === null) {
                throw new Error("No puedes cancelar. Debes introducir una hora para ver el menú.");
            }

            // Usuario deja el campo vacío y pulsa "Aceptar"
            if (horaUsuario.trim() === "") {
                throw new Error("El campo está vacío. Por favor, escribe una hora.");
            }

            // Validar formato HH:MM
            const formatoHora = /^([01]?\d|2[0-3]):([0-5]\d)$/;
            if (!formatoHora.test(horaUsuario.trim())) {
                throw new Error("Formato inválido. Usa HH:MM, por ejemplo: 09:00 o 21:45.");
            }

            // Extraer horas y minutos como números enteros
            const partes = horaUsuario.trim().split(":");
            hora = parseInt(partes[0], 10) + parseInt(partes[1], 10) / 60;

            esValida = true;

        } catch (error) {
            alert(`[ERROR DE ENTRADA]: ${error.message}`);
        }

    } while (!esValida);

    return hora;
}

// Ejecución
let horaDefinitiva = obtenerHoraValida();

// Asignación de menú
let menuSeleccionado;
if (horaDefinitiva >= 6 && horaDefinitiva < 12) {
    menuSeleccionado = "desayuno";
} else if (horaDefinitiva >= 12 && horaDefinitiva < 20) {
    menuSeleccionado = "almuerzo";
} else {
    menuSeleccionado = "cena";
}

alert(`¡Perfecto! Te corresponde el menú de ${menuSeleccionado.toUpperCase()}.`);

// Variables para guardar el pedido

const pedidoUsuario = {
    primero: null,
    segundo: null,
    postre: null,
    extras: null
};

// SELECCIÓN Y VALIDACIÓN

function pedirPlato(tiempoNombrado) {
    // Obtenemos los platos para el turno 
    const opcionesDisponibles = MENUS[menuSeleccionado][tiempoNombrado];

    // Texto del menú en la ventana emergente
    let textoCarta = `--- MENÚ DE ${menuSeleccionado.toUpperCase()} (${tiempoNombrado.toUpperCase()}) ---\n`;
    opcionesDisponibles.forEach(plato => {
        textoCarta += `- ${plato.nombre} ($${plato.precio.toFixed(2)})\n`;
    });
    textoCarta += `\nEscribe el nombre del plato o "ninguno" para omitir este tiempo:`;

    let platoEncontrado = null;
    let esValido = false;

    // Bucle de validación con Try...Catch
    do {
        try {
            let eleccionUsuario = prompt(textoCarta);

            // A: Si el usuario cancela
            if (eleccionUsuario === null) {
                throw new Error("No puedes dejar el pedido a medias. Debes elegir un plato.");
            }

            // Pasar a minúsculas y quitar espacios al principio/final
            let eleccionLimpia = eleccionUsuario.toLowerCase().trim();

            if (eleccionLimpia === "") {
                throw new Error("No has escrito nada. Por favor, introduce el nombre de un plato o escribe \"ninguno\".");
            }

            // El usuario no quiere niguno
            if (eleccionLimpia === "ninguno") {
                esValido = true;
                platoEncontrado = null;
                alert("De acuerdo, este plato se omitirá.");
                break;
            }

            // Buscar si el texto limpio coincide (nombre completo o parcial)
            platoEncontrado = opcionesDisponibles.find(plato => plato.nombre.includes(eleccionLimpia));

            // B: El plato escrito no existe
            if (!platoEncontrado) {
                let indiceErrorAleatorio = Math.floor(Math.random() * MENSAJES_ERROR.length);
                throw new Error(MENSAJES_ERROR[indiceErrorAleatorio]);
            }

            // Si el plato es correcto
            esValido = true;

            // Mensaje de éxito aleatorio
            let indiceExitoAleatorio = Math.floor(Math.random() * MENSAJES_EXITO.length);
            alert(MENSAJES_EXITO[indiceExitoAleatorio]);

        } catch (error) {
            alert(`[AVISO]: ${error.message}`);
        }

    } while (!esValido);

    // Devolver el objeto completo del plato (nombre y precio)
    return platoEncontrado;
}

alert("Procedemos a tomar nota de tu pedido de 4 tiempos.");

pedidoUsuario.primero = pedirPlato("primero");
pedidoUsuario.segundo = pedirPlato("segundo");
pedidoUsuario.postre  = pedirPlato("postre");
pedidoUsuario.extras  = pedirPlato("extras");

// Verificación del pedido
console.log("Pedido final registrado del usuario:", pedidoUsuario);

function generarFactura() {
    // 1. Calcular el coste total (ignorando los tiempos omitidos)
    const total = (pedidoUsuario.primero?.precio  ?? 0) +
                  (pedidoUsuario.segundo?.precio ?? 0) +
                  (pedidoUsuario.postre?.precio   ?? 0) +
                  (pedidoUsuario.extras?.precio   ?? 0);

    // 2. Formatear la fecha actual
    const fechaActual = new Date().toLocaleDateString();

    // Muestra la línea del plato o "No pedido"
    function lineaPlato(etiqueta, plato) {
        if (plato) {
            return `${etiqueta}${plato.nombre.padEnd(20, ' ')} $${plato.precio.toFixed(2)}\n`;
        }
        return `${etiqueta}${"(no pedido)".padEnd(20, ' ')} €0.00\n`;
    }

    // 3. Cuerpo de la factura
    let ticket = `====================================\n`;
    ticket += `          TICKET DE COMPRA          \n`;
    ticket += `       RESTAURANTE JAVASCRIPT       \n`;
    ticket += `====================================\n`;
    ticket += `Fecha: ${fechaActual}\n`;
    ticket += `Menú servido: ${menuSeleccionado.toUpperCase()}\n`;
    ticket += `------------------------------------\n`;

    ticket += lineaPlato("1º Plato:  ", pedidoUsuario.primero);
    ticket += lineaPlato("2º Plato:  ", pedidoUsuario.segundo);
    ticket += lineaPlato("Postre:    ", pedidoUsuario.postre);
    ticket += lineaPlato("Extras:    ", pedidoUsuario.extras);

    ticket += `------------------------------------\n`;
    ticket += `TOTAL A PAGAR:              €${total.toFixed(2)}\n`;
    ticket += `====================================\n`;
    ticket += `      ¡Gracias por su visita!       \n`;
    ticket += `====================================`;

    alert(ticket);
}

// Ejecutamos la función final
generarFactura();