const delay = (ms) =>
  new Promise((resolve, reject) => {
    console.log('render 2');
    setTimeout(resolve, ms)
  });

  export {delay};