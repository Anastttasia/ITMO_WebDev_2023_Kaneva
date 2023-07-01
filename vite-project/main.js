import newElementTable from "./template.js";

let currentInvoiceData = getAllLocalData();
let refOnCurrentItem = 0;

const itemsContainer = document.getElementById('containerColumn');
const qtyModal = document.getElementById('qtyModal');
const costModal = document.getElementById('costModal');
const titleModal = document.getElementById('titleModal');
const totalModal = document.getElementById('totalModal');

const createBtn = document.getElementById('createBtn');
createBtn.setAttribute("disabled", true);
createBtn.classList.add('createBtnActive');

const deleteBtn = document.getElementById('btnDelete');
deleteBtn.style.color = 'gray';

const subtotalElem = document.getElementById('Subtotal');

const discountInputElem = document.getElementById('DiscountInput');
const discountElem = document.getElementById('Discount');

const taxesInputElem = document.getElementById('TaxesInput');
const taxesElem = document.getElementById('Taxes');
const totalElem = document.getElementById('Total');

const operationNumber = document.getElementById('operationNumber');
operationNumber.value = Number(currentInvoiceData["id"]);

const ibanElem = document.getElementById('Iban');
ibanElem.value = String(currentInvoiceData["iban"]);

const addNewElementBtn = document.getElementById('addNewElement');
const closeModalWindowBtn = document.getElementById('closeModalWindow');
const modalWindow = document.getElementById('modalWindow');
const bgModalWindow = document.getElementById('bgModalWindow');
const contentModalWindow = document.getElementById('contentModalWindow');

function btnCreateElement() {
    let currentTemplate = new newElementTable(Number(qtyModal.value), Number(costModal.value));
    currentTemplate.itemTitle = String(titleModal.value);

    let itemElem = currentTemplate.render();
    itemElem.addEventListener("click", updateElement);

    itemsContainer.prepend(itemElem);

    currentInvoiceData["items"].push({
        "title": String(titleModal.value),
        "qty": Number(qtyModal.value),
        "cost": Number(costModal.value),
        "total": Number(qtyModal.value) * Number(costModal.value),
    });

    subtotalElem.textContent = String(Number(subtotalElem.textContent) + Number(qtyModal.value) * Number(costModal.value));
    calculateDiscount();
    closeModalWindow();
};

function btnUpdateElement() {
    let item = currentInvoiceData["items"][refOnCurrentItem];
    subtotalElem.textContent = String(Number(subtotalElem.textContent) + Number(qtyModal.value) * Number(costModal.value) - Number(item["total"]));

    item["title"] = String(titleModal.value);
    item["qty"] = Number(qtyModal.value);
    item["cost"] = Number(costModal.value);
    item["total"] = Number(qtyModal.value) * Number(costModal.value);

    calculateDiscount();
    window.location.reload();
};

function btnDeleteElement() {
    let item = currentInvoiceData["items"][refOnCurrentItem];
    subtotalElem.textContent = String(Number(subtotalElem.textContent) - Number(item["total"]));

    currentInvoiceData["items"].splice(refOnCurrentItem, 1);
    calculateDiscount();
    window.location.reload();
};

const addNewElement = () => {
    createBtn.onclick = btnCreateElement;
    deleteBtn.style.color = 'gray';
    deleteBtn.onclick = null;
    createBtn.innerText = "Create"
    modalWindow.classList.remove('noneModalWindow');
};

const updateElement = (event) => {
    console.log(currentInvoiceData["items"])
    deleteBtn.style.color = "red";
    deleteBtn.onclick = btnDeleteElement;

    createBtn.onclick = btnUpdateElement;
    createBtn.innerText = "Update"

    event.currentTarget.parentNode.childNodes.forEach((value, index) => {
        if (event.currentTarget.isSameNode(value)) {
            refOnCurrentItem = currentInvoiceData["items"].length - index - 1;
            return;
        }
    });

    let item = currentInvoiceData["items"][refOnCurrentItem];

    titleModal.value = item['title'];
    qtyModal.value = item['qty'];
    costModal.value = item['cost'];
    totalModal.innerText = item['total'];

    modalWindow.classList.remove('noneModalWindow');
};

const closeModalWindow = () => {
    clearModal();
    modalWindow.classList.add('noneModalWindow');
}

currentInvoiceData["items"].forEach(item => {
    let currentTemplate = new newElementTable(Number(item['qty']), Number(item['cost']));
    currentTemplate.itemTitle = String(item['title']);
    let itemElem = currentTemplate.render();
    itemElem.addEventListener("click", updateElement);

    itemsContainer.prepend(itemElem);

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

function handleIbanInput() {
    if (String(ibanElem.value).length > 42) {
        ibanElem.value = currentInvoiceData["iban"];
        return;
    }

    switch (String(ibanElem.value).length) {
        case 2: { }
        case 7: { }
        case 12: { }
        case 17: { }
        case 22: { }
        case 27: { }
        case 32: { }
        case 37: {
            ibanElem.value = String(ibanElem.value) + ' ';
            break;
        }
    }
    currentInvoiceData["iban"] = String(ibanElem.value);
    saveDataLocal();
}

ibanElem.oninput = handleIbanInput;

function calculateTotalCost() {
    let result =  Number(subtotalElem.textContent) - Number(discountElem.textContent) + Number(taxesElem.textContent);
    totalElem.textContent = String(result);
    currentInvoiceData["total"] = result;
    saveDataLocal();
}

function calculateTaxes() {
    let curVal = Number(taxesInputElem.value);
    if (!curVal) {
        taxesInputElem.value = "";
        taxesElem.textContent = "0";
    }
    else if (curVal > 100) {
        taxesInputElem.value = "";
        taxesElem.textContent = "0";
    }
    else {
        taxesInputElem.value = String(curVal);

        let result = Math.ceil(Number(subtotalElem.textContent) - Number(discountElem.textContent) * curVal / 100);
        taxesElem.textContent = String(result);
    }
    currentInvoiceData["taxes"] = curVal;
    calculateTotalCost();
};

function calculateDiscount() {
    let curVal = Number(discountInputElem.value);
    if (!curVal) {
        discountInputElem.value = "";
        discountElem.textContent = "0";
    }
    else if (curVal > 100) {
        discountInputElem.value = "";
        discountElem.textContent = "0";
    }
    else {
        discountInputElem.value = String(curVal);

        let result = Math.floor(Number(subtotalElem.textContent) * (curVal / 100));
        discountElem.textContent = String(result);
    }
    currentInvoiceData["discount"] = curVal;
    calculateTaxes();
};

taxesInputElem.oninput = calculateTaxes;
discountInputElem.oninput = calculateDiscount;

addNewElementBtn.addEventListener("click", addNewElement);
closeModalWindowBtn.addEventListener("click", closeModalWindow);
bgModalWindow.addEventListener("click", closeModalWindow);
contentModalWindow.addEventListener("click", function (event) { event.stopPropagation(); })

function saveDataLocal() {
    localStorage.setItem("invoice", JSON.stringify(currentInvoiceData));
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
