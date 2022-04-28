const Tarea = require('./tarea');

class Tareas {
    
    _listado = {

    };

    get listadoArr() {
        
        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        });

        return listado;
    }

    constructor() {
        this._listado = {};
    }

    borrarTarea(id = '') {

        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    cargarTareasFromArray(tareas = []){

        tareas.forEach(tarea => {
            this._listado[tarea.id] = tarea;
        })

    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto() {

        console.log();
        this.listadoArr.forEach((tarea,i) => { //resolucion adecuada
            const idx = `${i + 1 + '.'}`.green;
            const {desc, completado} = tarea;
            const estado = (completado)
                            ? 'Completada'.green
                            : 'Pendiente'.red;
            console.log(`${idx} ${desc} :: ${estado}`);
        });

        // for(let i=1; i <= Object.length(this._listado); i++){
        //     if(this._listado.completado == null){
        //         console.log(`${i.green} ${'.'.green} ${this._listado.desc} :: ${'Pendiente'.red}`);
        //     } else {
        //         console.log(`${i.green} ${'.'.green} ${this._listado.desc} :: ${'Completado'.green}`);
        //     }
        // } resolucion mia
    }

    listarPendientesCompletadas(completadas = true){

        console.log();
        let indice = 0;

        this.listadoArr.forEach(tarea => { //resolucion adecuada
            
            const {desc, completado} = tarea;

            const estado = (completado)
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            if(completadas){
                if(completado){
                    indice++;
                    console.log(`${(indice + '.').green} ${desc} :: ${completado.green}`);
                }
            } else {
                if(!completado){
                    indice++;
                    console.log(`${(indice + '.').green} ${desc} :: ${estado}`);
                }
            }

        });

    }

    toggleCompletadas(ids = []) {

        ids.forEach(id => {

            const tarea = this._listado[id];
            if(!tarea.completado) {
                tarea.completado = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {

            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completado = null;
            }

        })

    }

}

module.exports = Tareas;