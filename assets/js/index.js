//Seleccionamos los items de nuestro HTML
const inputTexto = document.querySelector("#inputTexto");
const ingresarBtn = document.querySelector("#ingresarBtn");
const tareasDiv = document.querySelector("#tareas");
const tareasRealizadas = document.querySelector("#realizadas");
const totalTareas = document.querySelector("#totalTareas");
let contador = 3;

//Creamos el arreglo
const tareas = [];


//Agregamos el listener
ingresarBtn.addEventListener("click" , tomarDatos)

//funciones
function tomarDatos(){
    //creamos el DIV principal de la tarea
    const DIV = document.createElement("div");
    DIV.classList.add("todo-div")
    //aumentamos +1 al contador 
    contador++;
    //Creamos el ID
    const identificadorTarea = document.createElement("h4");
    identificadorTarea.innerHTML = `ID ${contador}`;
    DIV.appendChild(identificadorTarea);
    //creamos el PARRAFO que ira dentro del DIV
    const parrafo = document.createElement("p");
    parrafo.innerHTML = inputTexto.value;
    //agregamos el parrafo al DIV
    DIV.appendChild(parrafo);
    //creamos el DIV de los Checks
    const checksDIV = document.createElement("div")
    checksDIV.classList.add("checks-div")
    //agregamos el CHECKBOX
    const checkbox = document.createElement("input")
    //agregamos el typo al CHECKBOX
    checkbox.type = "checkbox"
    //agregamos un id al checkbox
    let ID = inputTexto.value+contador;
    checkbox.id = ID;
    //agregamos el CHECKBOX al DIV
    checksDIV.appendChild(checkbox);
    //agregamos boton ELIMINAR
    const borrarBtn = document.createElement("button")
    borrarBtn.innerHTML = "X"
    //agregamos boton BORRAR al DIV
    checksDIV.appendChild(borrarBtn);
    DIV.appendChild(checksDIV);
    //limpiamos el INPUT
    inputTexto.value = "";
    //le pasamos la FUNCION de monitoreo de CHECK's
    cambioDeValoresCheckbox(checkbox, ID);
    agregarTareaAlArreglo(DIV, ID);
    borrar(ID, borrarBtn);
    renderTareas();
}

function cambioDeValoresCheckbox(checkbox, ID){
    checkbox.addEventListener("change", () => {
        const index = tareas.findIndex((element) => element.id == ID);
        const comparacion = tareas[index].id;
        const agregar = tareas[index];
        if(checkbox.checked){ 
            if(ID == comparacion){
                let nuevoValorCheckbox = {estado: true}
                const nuevoObjeto = {
                    ...agregar,
                    ...nuevoValorCheckbox
                }
                tareas.splice(index, 1, nuevoObjeto);
                realizadas();
            }
        }
        if(checkbox.checked == false){
            let nuevoValorCheckbox = {estado: false}
            const nuevoObjeto = {
                ...agregar,
                ...nuevoValorCheckbox
            }
            tareas.splice(index, 1, nuevoObjeto);
            realizadas();
        }
    })
}

function realizadas() {
    const tareasFiltradas = tareas.filter((tarea) => tarea.estado == true)
    tareasRealizadas.innerHTML = tareasFiltradas.length;
}

function agregarTareaAlArreglo(DIV, ID){
    const nuevaTarea = {nombre: DIV, id: ID}   
    tareas.push(nuevaTarea); 
    console.log(tareas);   
}

function renderTareas(){
    //limpiamos el HTML
    tareasDiv.innerHTML = "";
    for(let tarea of tareas){
        tareasDiv.appendChild(tarea.nombre);
    }
    totalTareas.innerHTML = tareas.length;
}

function borrar(ID, borrarBtn){
    borrarBtn.addEventListener("click", () => {
        const index = tareas.findIndex((element) => element.id == ID);
        tareas.splice(index, 1);
        renderTareas();
        realizadas();
    })
}

