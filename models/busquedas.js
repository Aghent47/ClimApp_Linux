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

            //returnamos un objeto de forma implicita.
            return data.data.features.map(lugar => ({
                //extraemos las propiedades que me interesan del objeto
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],

            }))

        }catch(error){

            return [];
        }

       

        return []; //lista de resultados
    }
}