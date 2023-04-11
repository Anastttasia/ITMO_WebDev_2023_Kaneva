// import "uno.css";
// import '@unocss/reset/tailwind.css';
import Keys from "./src/const/DOM";
import { randomString } from "./src/const/utils/stringUtils";

const DOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTask = DOM(Keys.DOM.Template.TASK)
const tasks = [];

const Tegs = ["Web", "Update", "Design", "Content"];
class TaskVO {
  constructor(title, date, status) {
    this.title = title
    this.date = date
    this.status = status
  }
}

DOM(Keys.DOM.Button.CREATE_TASK).onclick = () => {

  const domPopupCreateTask = DOM(Keys.DOM.Popup.CREATE_TASK);
  const domClosePopupCreateTask = QUERY(domPopupCreateTask, Keys.DOM.Button.CLOSE_CREATE_TASK_POPUP);
  const domConfermPopupCreateTask = QUERY(domPopupCreateTask, Keys.DOM.Button.POPUP_CREATE_TASK_CONFIRM);
  domPopupCreateTask.classList.remove('hidden');
  
  const onClosePopup = () => {
    domPopupCreateTask.classList.add('hidden');
    domClosePopupCreateTask.onclick = null;
    domConfermPopupCreateTask.onclick = null;
  }

  domClosePopupCreateTask.onclick = onClosePopup;

  domConfermPopupCreateTask.onclick = () => {

    const taskVO = new TaskVO(randomString(12), Date.now(), Tegs[0]);
    const taskView = domTask.cloneNode(true);

    QUERY(taskView, Keys.DOM.Template.Task.TITLE).innerText = taskVO.title;

    domTask.parentNode.prepend(taskView);
    tasks.push(taskVO)

    onClosePopup();
  }
}