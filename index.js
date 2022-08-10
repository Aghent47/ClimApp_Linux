import 'dotenv/config'
import { inquirerMenu, leerInput, pause, listarLugares } from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";

const main = async() => {


    const busquedas = new Busquedas();
    let opt;


    do {
        
        opt = await inquirerMenu();

        switch (opt) {
            case 1:

                //mostrar mensaje
                const lugaraBuscar = await leerInput('Ingrese la ciudad a buscar: ');

                //Buscar lugares
                const lugares = await busquedas.ciudad(lugaraBuscar); 

                //Seleccionar Lugar

                const idSelect = await listarLugares(lugares);
                if(idSelect === '0') continue;

                const lugarseleccionado = lugares.find(lugar => lugar.id === idSelect);

                // Guardar en DB

                busquedas.agregarHistorial(lugarseleccionado.nombre);

                // DATA:clima
                const clima = await busquedas.climaLugar(lugarseleccionado.lat, lugarseleccionado.lng);
                
                //mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarseleccionado.nombre.green);
                console.log('Lat:', lugarseleccionado.lat);
                console.log('Lon:', lugarseleccionado.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.temp_min);
                console.log('Máxima:', clima.temp_max);

                break;
            case 2:

                busquedas.historialCapitalizador.forEach( (lugar, i )=> {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                })

            break;

            case 0:
        }

        //console.log({ opt });

        if(opt !== 0) await pause();
        
    }while(opt !== 0);

};

main();