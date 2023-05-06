let a = '';
let b = '';
let sign = '';
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const action = ['-', '+', 'X', '/',];

const screen = document.querySelector('.calScreen');

function clearAll() {
  a = '';
  b = '';
  sign = '';
  finish = false;
  screen.textContent = 0;
}

document.querySelector('.Ac').onclick = clearAll;

document.querySelector('.btns').onclick = (event) => {
  if (!event.target.classList.contains('button')) return;
  if (event.target.classList.contains('Ac')) return;

  screen.textContent = '';
  const key = event.target.textContent;

  if (digit.includes(key)) {
    if (b === '' && sign === '') {
      a += key;
      console.log(a, b, sign);
      screen.textContent = a;
    }
    else if (a !== '' && b !== '' && finish) {
      b = key;
      finish = false;
      console.log(a, b, sign);
      screen.textContent = b;
      return;
    }
    else {
      b += key;
      screen.textContent = b;
    }
    console.log(a, b, sign);
    return;
  }

  if (action.includes(key)) {
    sign = key;
    screen.textContent = sign;
    console.log(sign);
    return;
  }

  if (key === '=') {
    if (b === '') b = a;
    switch (sign) {
      case "+": a = (+a) + (+b);
        break;
      case "-": a = a - b;
        break;
      case "X": a = a * b;
        break;
      case "/":
        if (b === '0') {
          screen.textContent = 'Error';
          a = '';
          b = '';
          sign = '';
          return;
        }
        a = a / b;
        break;
    }
    finish = true;
    screen.textContent = a;
    console.log(a, b, sign);
  }
}