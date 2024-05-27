const fecha = document.querySelector('#fecha')
const lista = document.querySelector('#lista')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')

const check='fa-check-circle'
const uncheck='fa-circle'
const lineThrough='line-through'

let LIST
let id

const filters=document.querySelectorAll('.filter')
let filter = ''
const deleteAllButton = document.querySelector(".delete-all");

//*fecha actual
const FECHA = new Date()
fecha.innerHTML=FECHA.toLocaleDateString('es-MX',{weekday:'long',month:'long',day:'numeric'})


function agregarTarea(tarea,id,realizado,eliminado){

    if(eliminado){return}

    const REALIZADO = realizado ?check :uncheck //* Forma corta de un if
    const LINE = realizado ?lineThrough :'' 

    const elemneto = `<li id="elemento" class="task">
                        <i class="far ${REALIZADO}" data="realizado" id=${id}></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id=${id}></i>
                      </li>`
    lista.insertAdjacentHTML("beforeend",elemneto)
}


function tareaRealizada(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].realizado = LIST[element.id].realizado ?false :true

    localStorage.setItem('To-Do-Adan',JSON.stringify(LIST))
}


function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].eliminado = true
    console.log(LIST)

    localStorage.setItem('To-Do-Adan',JSON.stringify(LIST))
}


botonEnter.addEventListener('click', ()=> {
    const tarea = input.value

    if (tarea) {
        agregarTarea(tarea,id,false,false)

        LIST.push({
            nombre: tarea,
            id: id,
            realizado: false,
            eliminado: false
        })
    }

    localStorage.setItem('To-Do-Adan',JSON.stringify(LIST))

    input.value=""
    id++
})

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const tarea = input.value

        if (tarea) {
            agregarTarea(tarea,id,false,false)

            LIST.push({
                nombre: tarea,
                id: id,
                realizado: false,
                eliminado: false
            })
        }

        localStorage.setItem('To-Do-Adan',JSON.stringify(LIST))

        input.value=""
        id++
    }
})

lista.addEventListener('click',function(event){
    const element = event.target
    const elementData = element.attributes.data.value

    if(elementData==='realizado'){
        tareaRealizada(element)
    }
    else if (elementData==='eliminado'){
        tareaEliminada(element)
    }
})

let data = localStorage.getItem('To-Do-Adan')
if(data){
    LIST=JSON.parse(data)
    id=LIST.length
    cargarLista(LIST)
} else {
    LIST=[]
    id=0
}

function cargarLista(DATA){
    DATA.forEach(function(i) {
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}

deleteAllButton.addEventListener("click", ()=>{
    LIST = []
    id = 0
    localStorage.setItem('To-Do-Adan',JSON.stringify(LIST))
    location.reload()
})