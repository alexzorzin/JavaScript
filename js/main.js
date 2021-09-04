let catalogo = "¡Bienvenido a SoftZWare! \n A continuación verás nuestro catalogo";
alert(catalogo);

const photoshop = 500;
const rust = 750;
const office = 3100;
const fifa = 3100;
const resident = 3450;

let totalPrecio;

let software = prompt("Elija el numero de programa que desee comprar: \n 1) Photoshop: $500 \n 2) Rust: $750 \n 3) Paquete Office: $3100 \n 4) FIFA 22: $3100 \n 5) Resident Evil: Village: $3450 ");
    
switch (software){
    case "1": totalPrecio = photoshop; break;
    case "2": totalPrecio = rust; break;
    case "3": totalPrecio = office; break;
    case "4": totalPrecio = fifa; break;
    case "5": totalPrecio = resident; break;
}

let preguntaProductos = prompt("¿Va a comprar algo más?");

while ((preguntaProductos.toLowerCase() == "si") && (software != "")){
    do {
        let otroSoftware = prompt("Elija el numero de programa que desee comprar: \n 1) Photoshop: $500 \n 2) Rust: $750 \n 3) Paquete Office: $3100 \n 4) FIFA 22: $3100 \n 5) Resident Evil: Village: $3450");
        switch (otroSoftware) {
            case "1": totalPrecio += photoshop; break;
            case "2": totalPrecio += rust; break;
            case "3": totalPrecio += office; break;
            case "4": totalPrecio += fifa; break;
            case "5": totalPrecio += resident; break;
        }

    preguntaProductos = prompt("¿Va a comprar algo más?");

    } while (preguntaProductos.toLowerCase() == "si");
}

if (software != "") {
    alert("Estás a punto de gastar un total de $" + totalPrecio);
}

let despedida = "Gracias por comprar aquí. Ayudas a que nuestro sitio sea más reconocido \n ¡Tenga un muy buen día!";
alert(despedida);

