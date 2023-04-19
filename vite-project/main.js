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
  const taskID = e.target.dataset.id;
  if(!taskID) return;

  const taskVO = tasks.find((task) => task.id === taskID);
  console.log('. taskVO:', taskVO);
  renderTaskPopup(taskVO, 'Update task', 'Update', (taskTitle, taskDate, taskTags) => {
    console.log('> Update task -> On Confirm',{ taskTitle, taskDate, taskTags});
    taskVO.title = taskTitle;
  }
  );
};

getDOM(Keys.DOM.Button.CREATE_TASK).onclick = () => {
  console.log('. domPopupCreateTask.classList');
  renderTaskPopup(null, 'Create task', 'Create', (taskTitle, taskDate, taskTags) => {
    console.log('Main > Create task -> On Confirm');
    const taskID = `task_${Date.now()}`;
    const taskVO = new TaskVO(taskID, taskTitle, taskDate, taskTags);
    
    renderTask(taskVO);
    tasks.push(taskVO);
    console.log('confirm', taskVO);

    taskVO.title = taskTitle;
    const domUpdateTask = renderTask(taskVO);
    domTaskColumn.replaceChild(domUpdateTask, domTaskSelected);
    saveTask();
  });
};

function renderTask(taskVO) {
  const domTaskClone = domTemplateTask.cloneNode(true);
  domTaskClone.dataset.id = taskVO.id;
  QUERY(domTaskClone, Keys.DOM.Template.Task.TITLE).innerText = taskVO.title;
  domTaskColumn.prepend(domTaskClone);
  return domTaskClone;
}

async function renderTaskPopup(taskVO, popupTitle, ConfirmText, processDataCallback) {
  const domPopupContainer = getDOM(Keys.DOM.Popup.CONTAINER);
  const domSpinner = domPopupContainer.querySelector('.spinner');

  domPopupContainer.classList.remove('hidden');

  const onClosePopup = () => {
    domPopupContainer.children[0].remove();
    domPopupContainer.append(domSpinner);
    domPopupContainer.classList.add('hidden');
  }

  const TaskPopup = (await import('./src/const/view/popup/TaskPopup')).default;
  const taskPopupInstasce = new TaskPopup(popupTitle, Tags, ConfirmText, processDataCallback, (taskTitle, taskDate, taskTags) => {
    console.log('Main => processDataCallback', { taskTitle, taskDate, taskTags })
    processDataCallback(taskTitle, taskDate, taskTags);
    onClosePopup();
  }
  );

  if(taskVO){
    taskPopupInstasce.TaskTitle= taskVO.title;
  }


  setTimeout(() => {
    domSpinner.remove();

    document.onclick = (e) =>{
      if(e.key === 'Escape'){
        onClosePopup();
      }
    };
    domPopupContainer.append(taskPopupInstasce.render());
  }, 1000);

  return;
};


function saveTask(){localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));}