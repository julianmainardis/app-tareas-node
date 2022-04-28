require('colors');

const { guardarDB, leerDB } = require('./helper/guardarArchivo');
const { inquirerMenu, 
        inquirerPausa,
        leerInput,
        listadoTareasBorrar,
        confirmacion,
        mostrarListadoCheckList
} = require('./helper/inquirer');

const Tareas = require('./models/tareas');



const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB);
    }

    do {
        opt = await inquirerMenu();

        switch (opt) {

            case '1':
                const desc = await leerInput('Descripcion:');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
                //console.log(tareas.listadoArr);
            break;

            case '3':
                tareas.listarPendientesCompletadas(true);
            break;

            case '4':
                tareas.listarPendientesCompletadas(false);
            break;

            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if(id !== '0'){
                    const confirmar = await confirmacion('Esta seguro que desea borrar?');
                    if(confirmar){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
            break;

        }

        guardarDB(tareas.listadoArr);

        await inquirerPausa();

    } while (opt !== '0');

    //pausa();
}

main();

