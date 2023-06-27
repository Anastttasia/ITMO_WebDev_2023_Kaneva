import newElementTable from "./template";

let currentInvoiceData = getAllLocalData();

const itemsContainer = document.getElementById('containerColumn');
const qtyModal = document.getElementById('qtyModal');
const costModal = document.getElementById('costModal');
const titleModal = document.getElementById('titleModal');
const totalModal = document.getElementById('totalModal');

const subtotalElem = document.getElementById('Subtotal');

const discountInputElem = document.getElementById('DiscountInput');
const discountElem = document.getElementById('Discount');

const taxesInputElem = document.getElementById('TaxesInput');
const taxesElem = document.getElementById('Taxes');

const totalElem = document.getElementById('Total');

const operationNumber = document.getElementById('operationNumber');
operationNumber.value = Number(currentInvoiceData["id"]);

const createBtn = document.getElementById('createBtn');
createBtn.setAttribute("disabled", true);
createBtn.classList.add('createBtnActive');

currentInvoiceData["items"].forEach(item => {
    let currentTemplate = new newElementTable(Number(item['qty']), Number(item['cost']));
    currentTemplate.itemTitle = String(item['title']);
    itemsContainer.prepend(currentTemplate.render());

    subtotalElem.textContent = String(Number(subtotalElem.textContent) + Number(item['total']));
});

taxesInputElem.value = currentInvoiceData["taxes"];
discountInputElem.value = currentInvoiceData["discount"];

calculateDiscount();

//MODAL START
function tryActivateButton() {
    if (Number(totalModal.innerText) > 0 && titleModal.value.length > 0) {
        createBtn.removeAttribute('disabled');
        return;
    }
    createBtn.setAttribute("disabled", true);
};

function handleOpNumberInput() {
    currentInvoiceData["id"] = operationNumber.value;
    saveDataLocal();
};

function handleCostInput() {
    if (!Number(costModal.value)) {
        costModal.value = 0;
        return;
    }
    totalModal.innerText = Number(qtyModal.value) * Number(costModal.value);
    tryActivateButton();
    saveDataLocal();
};

function handleQtyInput() {
    if (!Number(qtyModal.value)) {
        qtyModal.value = 0;
        return;
    }
    totalModal.innerText = Number(qtyModal.value) * Number(costModal.value);
    tryActivateButton();
    saveDataLocal();
};

function handleTitleInput() {
    tryActivateButton();
    saveDataLocal();
};

function clearModal() {
    titleModal.value = null;
    qtyModal.value = null;
    costModal.value = null;
    totalModal.innerText = "";
};

operationNumber.oninput = handleOpNumberInput;
qtyModal.oninput = handleQtyInput;
costModal.oninput = handleCostInput;
titleModal.oninput = handleTitleInput;
//MODAL END

function calculateTotalCost() {

    let result = Number(discountElem.textContent) + Number(taxesElem.textContent);
    totalElem.textContent = String(result);
    currentInvoiceData["total"] = result;
    saveDataLocal();
}

function calculateTaxes() {

    let curVal = Number(taxesInputElem.value)

    if (!curVal) {
        taxesInputElem.value = 0;
    }
    else if (curVal > 100.0) {
        taxesInputElem.value = 0;
    }
    taxesInputElem.value = String(curVal)

    let result = Math.ceil(Number(discountElem.textContent) * curVal / 100);
    taxesElem.textContent = String(result);
    
    currentInvoiceData["taxes"] = curVal;

    calculateTotalCost();
};

function calculateDiscount() {
    let curVal = Number(discountInputElem.value)

    if (!curVal) {
        discountInputElem.value = 0;
    }
    else if (curVal > 100.0) {
        discountInputElem.value = 0;
    }
    discountInputElem.value = String(curVal)

    let result = Math.floor(Number(subtotalElem.textContent) * (1.0 - (curVal / 100)));
    discountElem.textContent = String(result);
    
    currentInvoiceData["discount"] = curVal;

    calculateTaxes();
};

taxesInputElem.oninput = calculateTaxes;
discountInputElem.oninput = calculateDiscount;

const addNewElementBtn = document.getElementById('addNewElement');
const closeModalWindowBtn = document.getElementById('closeModalWindow');
const modalWindow = document.getElementById('modalWindow');
const bgModalWindow = document.getElementById('bgModalWindow');
const contentModalWindow = document.getElementById('contentModalWindow');

const addNewElement = () => {
    modalWindow.classList.remove('noneModalWindow');
};
const closeModalWindow = () => {
    modalWindow.classList.add('noneModalWindow');
}

addNewElementBtn.addEventListener("click", addNewElement);
closeModalWindowBtn.addEventListener("click", closeModalWindow);
bgModalWindow.addEventListener("click", closeModalWindow);
contentModalWindow.addEventListener("click", function (event) { event.stopPropagation(); })

createBtn.onclick = function () {
    let currentTemplate = new newElementTable(Number(qtyModal.value), Number(costModal.value));
    currentTemplate.itemTitle = String(titleModal.value);
    itemsContainer.prepend(currentTemplate.render());

    currentInvoiceData["items"].push({
        "title": String(titleModal.value),
        "qty": Number(qtyModal.value),
        "cost": Number(costModal.value),
        "total": Number(qtyModal.value) * Number(costModal.value),
    });

    subtotalElem.textContent = String(Number(subtotalElem.textContent) + Number(qtyModal.value) * Number(costModal.value));
    calculateDiscount();

    clearModal();
    closeModalWindow();
};

function saveDataLocal() {
    localStorage.setItem("invoice", JSON.stringify(currentInvoiceData))
}

function getAllLocalData() {

    let data = JSON.parse(localStorage.getItem('invoice'));

    if (data == null) {
        data = {};
        data["id"] = 0;
        data["items"] = new Array();
        data["discount"] = 0;
        data["taxes"] = 0;
        data["total"] = 0;
        data["iban"] = 0;
    }

    return data;
}

let totalSum = document.getElementById('Total');