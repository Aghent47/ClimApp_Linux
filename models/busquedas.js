import axios from "axios";

export class Busquedas {

    historial = [];
    constructor() {
        //TODO: Leer DB
    }

    async ciudad(lugar='') {
        
        //peticion a la API
        try{
            //console.log('Ciudad:',lugar);
            const data = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/Madrid.json?language=es&access_token=pk.eyJ1IjoibmVpZGVyLWhlcm5hbmRleiIsImEiOiJjbDZtenc3MDMwM3hxM3FxanE0Z2V6N2Y4In0.GiJA-VQlWiq3zk-cXRfqWw')
            console.log(data.data);

            return [];

        }catch(error){

            return [];
        }

       

        return []; //lista de resultados
    }
}