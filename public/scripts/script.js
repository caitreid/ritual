
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

// let body = document.querySelector('body')


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