import fs from 'fs';
import axios from "axios";


export class Busquedas {

    historial = [];
    dbpath = './db/databse.json';



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


    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHERMAP_KEY,
            units: "metric",
            lang: "es",
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

    async climaLugar(lat, lon) {

        try{
        
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWeather, lat, lon}, 
            });

            const data =  await instance.get();
            const { weather, main } = data.data;

            return {
                desc: weather[0].description, 
                temp: main.temp,
                temp_min: main.temp_min,
                temp_max: main.temp_max,
            }

        }catch(error){
            console.log(error);
        }


    }


     async agregarHistorial(lugar='') {

        //: TODO: prevenir duplicados
        if( this.historial.includes( lugar.toLocaleLowerCase())){
            return;
        }

        this.historial.unshift(lugar.toLocaleLowerCase());

        // Grabar en DB
        this.guardarDB();
    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbpath , JSON.stringify( payload ));
    }


    leerDB(){
    
    }





}