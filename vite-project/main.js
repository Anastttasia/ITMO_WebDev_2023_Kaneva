let operationNumber = document.getElementById('operationNumber').value;
console.log('operationNumber =', operationNumber);


const addNewElementBtn = document.getElementById('addNewElement');
const closeModalWindowBtn = document.getElementById('closeModalWindow');
const modalWindows = document.getElementById('modalWindow');
const bgModalWindow = document.getElementById('bgModalWindow');
const contentModalWindow = document.getElementById('contentModalWindow');

const addNewElement = () =>{
    modalWindows.classList.remove('noneModalWindow');
};
const closeVodalWindow = () =>{
    modalWindows.classList.add('noneModalWindow');
}

addNewElementBtn.addEventListener("click", addNewElement);
closeModalWindowBtn.addEventListener("click", closeVodalWindow);
bgModalWindow.addEventListener("click", closeVodalWindow);
contentModalWindow.addEventListener("click", function(event) {event.stopPropagation();})

