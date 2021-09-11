let totalSoftware = 0;
let arraySoftware = '';
alert("¡Saludos! Sea muy bienvenido a SoftZWare, donde todo programa se consigue a buen precio. Presione ACEPTAR para continuar")

function comprarSoftware() {

    let programaElegido = prompt(`¡Hola! Elija uno de estos programas/juegos para añadir a su carrito:
        1. Photoshop - $500
        2. Rainbow Six - $750
        3. FIFA 22 - $3100
        4. Paquete Office - $3150
        5. ESET NOD32 Antivirus - $3940
        6. Rust - $750

        Escriba aquí el nombre del programa/juego que desee comprar
    `)
    
    arraySoftware = programaElegido.split(',').map(function(item) {
        return item.trim();
    });
    console.log(arraySoftware)

    for (let i = 0; i < arraySoftware.length; i++) {
        
        switch(parseInt(arraySoftware[i])){
            case 1:
                totalSoftware += 500;
                console.log("$500");
                break;
            case 2:
                totalSoftware += 750;
                console.log("$750");
                break;
            case 3:
                totalSoftware += 3100;
                console.log("$3100");
                break;
            case 4:
                totalSoftware += 3150;
                console.log("$3150");
                break;
            case 5:
                totalSoftware += 3940;
                console.log("$3940");
                break;
            case 6:
                totalSoftware += 750;
                console.log("$750");
                break;
        } 
    }
}

comprarSoftware()
let comprarMas = prompt("Quiere seguir sumando compras? SI o NO")
let confirmaCompra = comprarMas.toUpperCase();


while(confirmaCompra == "SI") {
    do {
        comprarSoftware();
        
        comprarMas = prompt("Quiere seguir sumando compras? SI o NO")
        confirmaCompra = comprarMas.toUpperCase();

    } while(confirmaCompra == "SI")
}

let totalCompra = alert("¡Gracias por comprar aquí! El total de su compra es de" + " $" + totalSoftware)
console.log(arraySoftware)
console.log(`Total de tu compra ${totalSoftware}`)
