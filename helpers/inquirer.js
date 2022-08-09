import colors from 'colors';
import inquirer from "inquirer";
import pausa from "readline";

const questions = [
  {
    type: "list",
    name: "option",
    message: "Qué desea hacer?",
    choices: [
      {
        value: 1,
        name: `${'1.'.green} Buscar Lugar`,
      },
      {
        value: 2,
        name:  `${'2.'.green} Historial de Busquedas`,
      },
      {
        value: 0,
        name: `${'0.'.green} Listar tareas completadas`,
      },
    ],
  },
];

export const inquirerMenu = async () => {

  console.clear();
  console.log("======================================".green);
  console.log("        Selecciones una Opción        ".white);
  console.log("======================================\n".green);

  const { option } = await inquirer.prompt(questions);

  return option;
  
};

export const pause = async () => {
    
    return new Promise(resolve => {

        const readline  = pausa.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readline.question(`\nPresione ${ 'ENTER'.green } para continuar\n ` , () => {
            readline.close();
            resolve();
        });
    });
}

export const leerInput = async( message ) =>{

  const question = [
    {
      type: 'input',
      name: 'desc',
      message,
      validate(value){
        if (value.length === 0 ){
          return 'Por favor ingrese un valor';
        }
        return true;
      }
    }
  ];

  const {desc} = await inquirer.prompt(question); 
  return desc;
}

export const listadoTareasBorrar = async( tareas = [] ) => {

  const choices = tareas.map((tarea, i ) => {

    const idx = `${i + 1}`.green;
    return {
      value: tarea.id,
      name: `${ idx }. ${tarea.desc}`
    }
  });

  choices.unshift({ //Para agregar al inicio del menu
    value:'0',
    name: '0.'.green + 'Cancelar'
  });

  const preguntas = [
    {
      type: 'list',
      name: 'id',
      message: 'Borrar',
      choices
    }
  ];

  const { id } = await inquirer.prompt(preguntas);
  
  return id
}

export const confirmar = async (message) => {

  const question = [
    {
      type: 'confirm',
      name: 'ok',
      message
    }
  ];

  const { ok } = await inquirer.prompt(question);

  return ok;

}

export const mostrarListCheck = async( tareas = [] ) => {

  const choices = tareas.map((tarea, i ) => {

    const idx = `${i + 1}`.green;

    return {
      value: tarea.id,
      name: `${ idx }. ${tarea.desc}`,
      checked: (tarea.completadoEn) ? true : false
    }
  });
  
const preguntas = [
    {
      type: 'checkbox',
      name: 'ids',
      message: 'Selecciones',
      choices
    }
  ];

  const { ids } = await inquirer.prompt(preguntas);
  
  return ids;
}

//module.exports = {
//  inquirerMenu,
//  pause,
//  //leerInput,
//  listadoTareasBorrar,
//  confirmar,
//  mostrarListCheck
//};