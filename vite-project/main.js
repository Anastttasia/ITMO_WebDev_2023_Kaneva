// import "uno.css";
// import '@unocss/reset/tailwind.css';
import { fromJSON } from "postcss";
import Keys from "./src/const/DOM";
import { randomString } from "./src/const/utils/stringUtils";

const KEY_LOCAL_TASKS = 'tasks';

const Tags = ["Web", "Update", "Design", "Content"];

class TaskVO {
  static fromJSON(json) {
    return new TaskVO(json.id, json.title, json.date, json.tag);
  }
  constructor(id, title, date, tag) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.tag = tag;
  }
}

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateTask = getDOM(Keys.DOM.Template.TASK);
const domTaskColumn = domTemplateTask.parentNode;
domTemplateTask.removeAttribute('id');
domTemplateTask.remove();

const rawTasks = localStorage.getItem(KEY_LOCAL_TASKS);

const tasks = rawTasks ? JSON.parse(rawTasks).map((json) => TaskVO.fromJSON(json)) : [];
tasks.forEach((taskVO) => renderTask(taskVO));
console.log("> tasks:", tasks);

domTaskColumn.onclick = (e) => {
  e.stopPropagation();
  console.log('domTaskColumn', e.target);
  renderTaskPopup('Update task', 'Update', () => {
    console.log('> Update task -> On Confirm');
  });
};

getDOM(Keys.DOM.Button.CREATE_TASK).onclick = () => {
  renderTaskPopup('Create task', 'Create', () => {
    console.log('> Create task -> On Confirm')
  });
};

function onCreateTaskClik() {
  const taskID = `task_${Date.now()}`;
  const taskTitle = randomString(12);
  const taskVO = new TaskVO(taskID, taskTitle, Date.now(), Tags[0]);

  renderTask(taskVO);
  tasks.push(taskVO);
  console.log('confirm', taskVO);
  localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));
}

function renderTask(taskVO) {
  const domTaskClone = domTemplateTask.cloneNode(true);
  domTaskClone.dataset.id = taskVO.id;
  QUERY(domTaskClone, Keys.DOM.Template.Task.TITLE).innerText = taskVO.title;
  domTaskColumn.prepend(domTaskClone);
}

async function renderTaskPopup(popupTitle, ConfirmText, confirmCallback) {
  const domPopupContainer = getDOM(Keys.DOM.Popup.CONTAINER);
  const domSpinner = domPopupContainer.querySelector('.spinner');

  domPopupContainer.classList.remove('hidden');

  const TaskPopup = (await import('./src/const/view/popup/TaskPopup')).default;
  const taskPopupInstasce = new TaskPopup(popupTitle, Tags, ConfirmText, confirmCallback, () => {
    domPopupContainer.children[0].remove();
    domPopupContainer.append(domSpinner);
    domPopupContainer.classList.add('hidden');
    }
    
  );

  setTimeout(() => {
    domSpinner.remove();
    domPopupContainer.append(taskPopupInstasce.render());
  }, 1000);

  return;
};