const DOM = document.getElementById.bind(document);

const domInpName =  DOM('inpName');
const domInpSurname = DOM('inpSurname');
const domConResult =  DOM('conResult');

let fullName = "";

domInpName.oninput = function(event){
  console.log('onInpNameInput', {event});
  renderFullName();
}

domInpSurname.oninput = function (event){
  console.log('onInpSurnameInput', {event});
  renderFullName();
}

const getFullName = () => `${domInpName.velue} ${domInpSurname.velue}`;

function renderFullName(){
  domConResult.textContent = getFullName();
}





console.log(domInpName, domInpSurname)
