const d = document,
w = window;

const fecha = d.querySelector("#fecha");
const lista = d.querySelector("#lista");
const elemento = d.querySelector("#elemento");
const input = d.querySelector("#input");
const botonEnter = d.querySelector("#enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineTrough = "line-trough";

let LIST

let id //para que inicie en 0 cada tarea tendra un id diferente

//console.log(fecha,lista,input,botonEnter);

//creacion de fecha

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString("es-MX", {weekday: "long", month: "short", day:"numeric"})


//Funcion agregar tarea 

function agregaTarea(tarea,id,realizado,eliminado){
    if(eliminado){return}//si eliminado es true, no ejecuta la tarea
    //uso de return para terminar la ejecucion del programa si la condicion se cumple
    const REALIZADO = realizado ? check : uncheck //si realizado es verdadero check sino uncheck
    const LINE = realizado ? lineTrough : ''

    const elemento = ` <li>
                    <i class="far ${REALIZADO}" data="realizado" id="${id}"></i>
                    <p class="text ${LINE}">${tarea}</p>
                    <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                    </li>`

    lista.insertAdjacentHTML("beforeend",elemento);
}

//function de tarea Realizada

function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineTrough);
    LIST[element.id].realizado = LIST[element.id].realizado ?false : true //Si
    // console.log(LIST)
    // console.log(LIST[element.id])
    // console.log(LIST[element.id].realizado)
    //parentnode es para ver los elementos hijos
}

function tareaEliminada(element){
    // console.log(element.parentNode)
    // console.log(element.parentNode.parentNode)
     element.parentNode.parentNode.removeChild(element.parentNode)
     LIST[element.id].eliminado = true
     console.log(LIST)
 }
 

botonEnter.addEventListener("click", () =>{
    const tarea = input.value
    if(tarea){//Si tarea existe y tiene un contenido, ejecuta la funcion
        agregaTarea(tarea,id,false,false)
        //al hacer una nueva tarea tanto como realizado y eliminado son false.
        LIST.push({//PUSH sirve para agregar elementos a un  array
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
        localStorage.setItem('TODO',JSON.stringify(LIST))
         input.value ='';//Para resetear el contenido del input al cargar la tarea
         id++
    }
    
})


d.addEventListener("keyup", function(event){
    if(event.key == "Enter"){//event.key = Tecla presionada
        const tarea = input.value
        if(tarea) {
            agregaTarea(tarea,id, false,false)
        LIST.push({//PUSH sirve para agregar elementos a un  array
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
        //Local storage setitem = AGREGAR
        localStorage.setItem('TODO',JSON.stringify(LIST))

        input.value ='';   
        id++
        console.log(LIST);
        }

    }
        
})

lista.addEventListener('click',function(event){
    const element = event.target// event.target es el elemento “objetivo” que inició el evento
    const elementData = element.attributes.data.value
    console.log(elementData)
    // console.log(element)
    // console.log(element.attributes)//Nos en lista todos los identificadores que tiene este elemento
    // console.log(element.attributes.data)//Nos da el atributo data
    // console.log(element.attributes.data.value);//Nos da el valor de data
    if(elementData == 'realizado'){
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado'){
        tareaEliminada(element)
        console.log("eliminado")
    }
    localStorage.setItem('TODO',JSON.stringify(LIST))
})

//Local storage get item = OBTENER
//Local storage set item = AGREGAR
//JSON (javascript object notation) archivo sencillo de texto 
//para intercambiar datos
//STRIGNIFY = Convertir del lenguaje usado a JSON
//Parse = Convertir de formato JSON al lenguaje utilizado

let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    cargarLista(LIST)
}else {
    LIST = []
    id = 0
}

function cargarLista(array) {
    array.forEach(function(i){
      agregaTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}

