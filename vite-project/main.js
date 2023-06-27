import newElementTable from "./template";

const itemsContainer = document.getElementById('containerColumn');

let currentInvoiceData = getAllLocalData();
let currentId = currentInvoiceData ? currentInvoiceData["id"] : 0;
let currentItems = currentInvoiceData ? currentInvoiceData["items"] : new Array();
//let currentDiscount = currentInvoiceData["discount"];
//let currentTaxes = currentInvoiceData["taxes"];
//let currentTotal = currentInvoiceData["total"];
//let currentIban = currentInvoiceData["iban"];

currentItems.forEach(item => {
    let currentTemplate = new newElementTable(Number(item['qty']), Number(item['cost']));
    currentTemplate.itemTitle = String(item['title']);
    itemsContainer.prepend(currentTemplate.render());
});


console.log(currentInvoiceData)

let operationNumber = document.getElementById('operationNumber');
operationNumber.value = Number(currentId);
console.log('operationNumber =', operationNumber.value);

let qtyModal = document.getElementById('qtyModal');
let costModal = document.getElementById('costModal');
let titleModal = document.getElementById('titleModal');
const createBtn = document.getElementById('createBtn');
createBtn.setAttribute("disabled", true);
createBtn.classList.add('createBtnActive');


//MODAL START
function countTotalModal() {
    let formula = qtyModal.value * costModal.value;
    let result = JSON.parse(formula);
    document.getElementById('totalModal').innerText = result;
    console.log('countTotalModal -> result', result);
    return Number(result)
};

function tryActivateButton() {
    if (countTotalModal() > 0 && titleModal.value.length > 0) {
        createBtn.removeAttribute('disabled');
        return;
    }
    createBtn.setAttribute("disabled", true);
};

operationNumber.oninput = saveDataLocal;
qtyModal.oninput = tryActivateButton;
costModal.oninput = tryActivateButton;
titleModal.oninput = tryActivateButton;
//MODAL END

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
    let currentTemplate = new newElementTable(Number(qtyModal.value), Number(costModal.value));
    currentTemplate.itemTitle = String(titleModal.value);
    currentItems.push({
        "title": String(titleModal.value),
        "qty": Number(qtyModal.value),
        "cost": Number(costModal.value),
        "total": Number(qtyModal.value) * Number(costModal.value),
    });
    itemsContainer.prepend(currentTemplate.render());
    closeModalWindow();
    saveDataLocal();
};

function saveDataLocal() {
    let data = {}
    console.log(currentItems)
    data["id"] = operationNumber.value;
    data["items"] = currentItems;
    data["discount"] = 0;
    data["taxes"] = 0;
    let totalCost = 0;
    currentItems.forEach(item => totalCost += item['total']);
    data["total"] = totalCost;
    data["iban"] = 0;

    localStorage.setItem("invoice", JSON.stringify(data))
}

function getAllLocalData() {
    return JSON.parse(localStorage.getItem('invoice'));
}

let totalSum = document.getElementById('Total');