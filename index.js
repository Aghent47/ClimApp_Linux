import { inquirerMenu, leerInput, pause } from "./helpers/inquirer.js";
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
                const resultados = await busquedas.ciudad(lugaraBuscar); 

                //Seleccionar Lugar

                // DATA:clima

                //mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad',);
                console.log('Lat:',);
                console.log('Lon:',);
                console.log('Temperatura:',);
                console.log('Mínima:',);
                console.log('Máxima:',);
            case 2:

            case 0:
        }

        //console.log({ opt });

        if(opt !== 0) await pause();
        
    }while(opt !== 0);

};

main();