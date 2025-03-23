const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const costos = {
    riel: 50 / 1000,
    jambaConMosquitero: 85 / 1000,
    jamba: 77 / 1000,
    zoclo: 96 / 1000,
    cabezal: 43 / 1000,
    cercoChapa: 65 / 1000,
    traslape: 79 / 1000,
    verticalMosquitero: 43 / 1000,
    horizontalMosquitero: 40 / 1000,
    vidrio: 300 / 1000000,
    felpa: 1 / 1000,
    vinil: 6 / 1000,
    telaMosquitero: 50 / 1000000,
    carretilla: 20,
    carretillaMosquitero: 12,
    carretillaFleje: 18,
    jaladeraEmb: 80,
    jaladeraContraPlana: 24
};

rl.question('Ingresa el ancho de la ventana en milímetros: ', (anchoInput) => {
    rl.question('Ingresa el alto de la ventana en milímetros: ', (altoInput) => {
        const ancho = parseFloat(anchoInput);
        const alto = parseFloat(altoInput);

        if (isNaN(ancho) || ancho <= 0 || isNaN(alto) || alto <= 0) {
            console.log('Por favor, ingresa valores numéricos positivos para el ancho y el alto.');
            rl.close();
            return;
        }

        const materiales = calcularMateriales(ancho, alto);
        const herrajes = calcularHerrajes((ancho - 147) / 2, alto - 125, alto - 135);

        mostrarTabla(materiales, herrajes);
        mostrarCroquis(ancho, alto);

        rl.close();
    });
});

function calcularMateriales(ancho, alto) {
    const riel = ancho;
    const jambaConMosquitero = ancho;
    const jamba = alto - 26;
    const zoclo = (ancho - 185) / 2;
    const cabezal = zoclo;
    const cercoChapa1 = alto - 30;
    const cercoChapa2 = alto - 40;
    const traslape1 = alto - 30;
    const traslape2 = alto - 40;
    const verticalMosquitero = alto - 20;
    const horizontalMosquitero = (ancho - 25) / 2;
    const perimetro = 2 * (ancho + alto);
    const felpa = perimetro * 3;
    const vinil = perimetro * 2;

    return [
        { nombre: 'Riel', medida: riel, precio: riel * costos.riel },
        { nombre: 'Jamba con Mosquitero', medida: jambaConMosquitero, precio: jambaConMosquitero * costos.jambaConMosquitero },
        { nombre: 'Jamba', medida: jamba, precio: jamba * costos.jamba },
        { nombre: 'Zoclo', medida: zoclo, precio: zoclo * costos.zoclo },
        { nombre: 'Cabezal', medida: cabezal, precio: cabezal * costos.cabezal },
        { nombre: 'Cerco Chapa 1', medida: cercoChapa1, precio: cercoChapa1 * costos.cercoChapa },
        { nombre: 'Cerco Chapa 2', medida: cercoChapa2, precio: cercoChapa2 * costos.cercoChapa },
        { nombre: 'Traslape 1', medida: traslape1, precio: traslape1 * costos.traslape },
        { nombre: 'Traslape 2', medida: traslape2, precio: traslape2 * costos.traslape },
        { nombre: 'Vertical Mosquitero', medida: verticalMosquitero, precio: verticalMosquitero * costos.verticalMosquitero },
        { nombre: 'Horizontal Mosquitero', medida: horizontalMosquitero, precio: horizontalMosquitero * costos.horizontalMosquitero },
        { nombre: 'Vinil', medida: vinil, precio: vinil * costos.vinil },
        { nombre: 'Felpa', medida: felpa, precio: felpa * costos.felpa }
    ];
}

function calcularHerrajes(vidrioAncho, vidrioAltoFijo, vidrioAltoCorredizo) {
    return [
        { nombre: 'Carretillas', cantidad: 2, precio: 2 * costos.carretilla },
        { nombre: 'Carretillas Mosquitero', cantidad: 2, precio: 2 * costos.carretillaMosquitero },
        { nombre: 'Carretillas Fleje', cantidad: 2, precio: 2 * costos.carretillaFleje },
        { nombre: 'Jaladera Embutir', cantidad: 1, precio: costos.jaladeraEmb },
        { nombre: 'Jaladera Contra Plana', cantidad: 1, precio: costos.jaladeraContraPlana },
        { nombre: 'Vidrio Fijo', cantidad: 1, precio: vidrioAncho * vidrioAltoFijo * costos.vidrio },
        { nombre: 'Vidrio Corredizo', cantidad: 1, precio: vidrioAncho * vidrioAltoCorredizo * costos.vidrio }
    ];
}

function mostrarTabla(materiales, herrajes) {
    console.log('\n--- Materiales y Costos ---\n');
    console.log('Material\t\t\tMedida (mm)\tCosto (MXN)');
    console.log('------------------------------------------------------------');
    let totalMateriales = 0;
    materiales.forEach(item => {
        console.log(`${item.nombre.padEnd(25)}\t${item.medida.toFixed(2)}\t$${item.precio.toFixed(2)}`);
        totalMateriales += item.precio;
    });

    console.log('------------------------------------------------------------');
    console.log(`Total Materiales:\t\t\t\t$${totalMateriales.toFixed(2)}`);

    console.log('\n--- Herrajes y Vidrios ---\n');
    console.log('Herraje\t\t\tCantidad\tCosto (MXN)');
    console.log('------------------------------------------------------------');
    let totalHerrajes = 0;
    herrajes.forEach(item => {
        console.log(`${item.nombre.padEnd(25)}\t${item.cantidad}\t$${item.precio.toFixed(2)}`);
        totalHerrajes += item.precio;
    });

    console.log('------------------------------------------------------------');
    console.log(`Total Herrajes y Vidrios:\t\t\t$${totalHerrajes.toFixed(2)}`);

    const totalGeneral = totalMateriales + totalHerrajes;
    console.log('\n============================================================');
    console.log(`TOTAL GENERAL:\t\t\t\t\t$${totalGeneral.toFixed(2)}`);
    console.log('============================================================');
}

function mostrarCroquis(ancho, alto) {
    console.log('\n--- Croquis de la Ventana ---\n');
    console.log(`+---------------------------+`);
    console.log(`|                           |`);
    console.log(`|      Vidrio Corredizo     |  Altura: ${alto} mm`);
    console.log(`|                           |`);
    console.log(`+---------------------------+`);
    console.log(`|                           |`);
    console.log(`|       Vidrio Fijo         |`);
    console.log(`|                           |`);
    console.log(`+---------------------------+  Ancho: ${ancho} mm`);
}