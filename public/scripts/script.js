
window.addEventListener("load", () => {
    console.log("page is fully loaded"); 

    
});



document.getElementById('datePicker').valueAsDate = new Date();

let create = document.querySelector('.create')
let modal = document.querySelector('.modal__card')

create.addEventListener('click', () => {
    console.log('create')
    modal.classList.remove('hide')
    modal.classList.add('show')
})

let body = document.querySelector('body')

body.addEventListener('click', (event) => {

    if((event.target).closest('.container-fluid') && (modal.classList.contains('show')) ) {
        console.log('outside')
        modal.classList.remove('show')
        modal.classList.add('hide')
    } 
})