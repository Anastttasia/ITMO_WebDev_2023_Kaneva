// import newElementTable from "./tamplate";

let operationNumber = document.getElementById('operationNumber').value;
console.log('operationNumber =', operationNumber);

const domElementColun = document.getElementById('containerColumn');

let qtyModal = document.getElementById('qtyModal');
let costModal = document.getElementById('costModal');
let titleModal = document.getElementById('titleModal');
const createBtn = document.getElementById('createBtn');
createBtn.setAttribute("disabled", true);
createBtn.classList.add('createBtnActive');

function countTotalModal(qtyModal, costModal) {
    let formula = qtyModal.value * costModal.value;
    let result = JSON.parse(formula);
    document.getElementById('totalModal').innerText = result;
    console.log('countTotalModal -> result', result);
    return Number(result)
};

function tryActivateButton(resultCost) {
    console.log('tryActivateButton -> titleModal', typeof titleModal);
    if (resultCost > 0 && titleModal.value.length > 0) {
        createBtn.removeAttribute('disabled');

        return;
    }
    else {
        createBtn.setAttribute("disabled", true);
        return;
    }
};

qtyModal.oninput = function () {
    let resultCost = countTotalModal(qtyModal, costModal);
    console.log('qtyModal.oninput -> qtyModal', qtyModal.value);
    console.log('qtyModal.oninput -> costModal', costModal.value);
    tryActivateButton(resultCost);
};

costModal.oninput = function () {
    let resultCost = countTotalModal(qtyModal, costModal);
    console.log('costModal.oninput -> qtyModal', qtyModal.value);
    console.log('ostModal.oninput -> costModal', costModal.value);
    tryActivateButton(resultCost);
};

titleModal.oninput = function () {
    console.log('titleModal.oninput -> titleModal ДО string', typeof titleModal);
    text = String(titleModal.value);
    console.log('titleModal.oninput -> titleModal ПОСЛЕ string', typeof titleModal);
    console.log('titleModal.oninput -> titleModal', titleModal);
    console.log('titleModal.oninput -> titleModal.length', titleModal.length);
    console.log('titleModal.oninput -> titleModal.value', titleModal.value);
    if (text.length == 0) {
        createBtn.setAttribute("disabled", true);
        console.log('titleModal.oninput -> IF titleModal.length', titleModal.length);
    }
    console.log('text', text);
    tryActivateButton();
};


// function renderElement(taskVO) {
//     const domTaskClone = newElementTable.cloneNode(true);
//     domElementColun.dataset.id = taskVO.id;
//     QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
//     domTaskColumn.prepend(domTaskClone);

//     return domTaskClone;
//   }

//MODAL WINDOW
const addNewElementBtn = document.getElementById('addNewElement');
const closeModalWindowBtn = document.getElementById('closeModalWindow');
const modalWindows = document.getElementById('modalWindow');
const bgModalWindow = document.getElementById('bgModalWindow');
const contentModalWindow = document.getElementById('contentModalWindow');

const addNewElement = () => {
    modalWindows.classList.remove('noneModalWindow');
};
const closeModalWindow = () => {
    modalWindows.classList.add('noneModalWindow');
}

addNewElementBtn.addEventListener("click", addNewElement);
closeModalWindowBtn.addEventListener("click", closeModalWindow);
bgModalWindow.addEventListener("click", closeModalWindow);
contentModalWindow.addEventListener("click", function (event) { event.stopPropagation(); })

createBtn.onclick = function () {
    console.log('createBtn.onclick -> Вызывает');
    closeModalWindow();
};