// var
const carrito = document.querySelector(`#carrito`);
const contenedorCarrito = document.querySelector(`#lista-carrito tbody`);
const vaciarCarritoBtn = document.querySelector(`#vaciar-carrito`);
const listacurso = document.querySelector(`#lista-cursos`);
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(e) {
    // cuando agregas un curso presionando "agregar al carrito"
    listacurso.addEventListener(`click`, agregarCurso);

    //elimina cursos del carrito
    carrito.addEventListener(`click`, eliminarCursos)

    // vaciar carrito
    vaciarCarritoBtn.addEventListener(`click`, (e) => {
        e.preventDefault();
        articulosCarrito = []; //reseteamos el arreglo

        limpiarHTML(); // eliminamos todo el html
    })
};

//funciones 
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains("agregar-carrito")){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
};

//elimina un curso del carrito
function eliminarCursos(e) {
    console.log(e.target.classList);
    if(e.target.classList.contains(`borrar-curso`)) {
        const cursoID = e.target.getAttribute(`data-id`);

        //eliminar del arreglo de articuloCarrito por el data id 
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoID);
        
        carritoHTML(); //iterar sobre el carrito y mostrar el HTML
    }
}

//leer el contenido del html y extraer info
function leerDatosCurso(curso) {
    // console.log(curso);
    //crear un objeto con el contenido del curso actual
    const InfoCurso = {
        imagen: curso.querySelector(`img`).src,
        titulo: curso.querySelector(`h4`).textContent,
        precio: curso.querySelector(`.precio span`).textContent,
        id: curso.querySelector(`a`).getAttribute(`data-id`),
        cantidad: 1
    }

    // revisa si un elemento ya existe dentro del carrito
    const existe = articulosCarrito.some( curso => curso.id === InfoCurso.id);
    if(existe) {
        // actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if( curso.id === InfoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            }else {
                return curso; // retorna los objetos que no son los duplicados
            }
        });
        articulosCarrito = [...cursos];
    } else{
        // agregar elementos al carrito
        articulosCarrito = [...articulosCarrito, InfoCurso]
    }
    console.log(articulosCarrito);

    carritoHTML(); 
}

//mmuestra el carrito en el html

function carritoHTML() {

    //limpiar el html
    limpiarHTML();

    //recorre el carrito y genera html
    articulosCarrito.forEach( curso => {
        const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement(`tr`);
        row.innerHTML = `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td><a href="#" class="borrar-curso" data-id="${id}"> x </a></td>
        `;

        //agega el html del carrito en el body
        contenedorCarrito.appendChild(row);
    });
}  

// elimina los cursos del tbody
function limpiarHTML() {
    // forma lenta
    // contenedorCarrito.innerHTML = ``;
    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}