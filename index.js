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
                const lugarseleccionado = lugares.find(lugar => lugar.id === idSelect);

                // DATA:clima

                //mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarseleccionado.nombre);
                console.log('Lat:', lugarseleccionado.lat);
                console.log('Lon:', lugarseleccionado.lng);
                console.log('Temperatura:', );
                console.log('Mínima:',);
                console.log('Máxima:',);

                break;
            case 2:

            case 0:
        }

        //console.log({ opt });

        if(opt !== 0) await pause();
        
    }while(opt !== 0);

};

main();