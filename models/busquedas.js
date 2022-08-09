import axios from "axios";

export class Busquedas {

    historial = [];
    constructor() {
        //TODO: Leer DB
    }


    get paramsMapbox() {
       return {
        'access_token': process.env.MAPBOX_KEY,
        'limit': 5,
        'language': 'es',
       }
    }

    async ciudad(lugar='') {
        
        //peticion a la API
        try{
            
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox,
            });

            const data =  await instance.get();

            console.log(data.data);

            return [];

        }catch(error){

            return [];
        }

       

        return []; //lista de resultados
    }
}