// import "uno.css";
import '@unocss/reset/tailwind.css';

const domBtnCreateTask = document.getElementById("btnCreateTask");
const domPopupCreateTask = document.getElementById("popupCreateTask");


domBtnCreateTask.onclick = () => {
  const domBtnCloseCreatTaskPopup = document.getElementById("btnCloseCreatTaskPopup");
  domPopupCreateTask.classList.remove('hidden');
  domBtnCloseCreatTaskPopup.onclick = () => {
    domPopupCreateTask.classList.add('hidden');
    omBtnCloseCreatTaskPopup.onclick = null;
  }
}