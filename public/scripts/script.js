
window.addEventListener("load", () => {
    console.log("page is fully loaded"); 

    
});


// auto-set the date to today on forms
let datePicker = document.getElementById('datePicker');

if (datePicker) {
    document.getElementById('datePicker').valueAsDate = new Date();
}

// modal 
let create = document.querySelector('.create')
let modal = document.querySelector('.modal__card')

if (create) {

    create.addEventListener('click', () => {
        console.log('create')
        modal.classList.remove('hide')
        modal.classList.add('show')
    })
}


// let body = document.querySelector('body')

// I don't think this is going to work
document.addEventListener('click', function handleClick(event) {
    const hasClass = event.target.classList.contains('container-fluid');
    console.log(hasClass);
  
    if (hasClass) {
        console.log('Event.target has the specified class');
        console.log('outside')
        modal.classList.remove('show')
        modal.classList.add('hide')
    }
    
  });