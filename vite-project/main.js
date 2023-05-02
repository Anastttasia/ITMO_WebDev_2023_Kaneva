// import "uno.css";
// import '@unocss/reset/tailwind.css';
import { fromJSON } from "postcss";
import Dom from "./src/const/DOM";
import { delay } from "./src/const/utils/timeUntils";
import TasksModel from "./src/mvc/model/TaskModel";
import TaskVO from "./src/mvc/model/vo/TaskVO";
import TasksController from "./src/mvc/controller/TasksController";

const KEY_LOCAL_TASKS = 'tasks';

const Tags = ["Web", "Update", "Design", "Content"];

const getDOM = (id) => document.getElementById(id);
const QUERY = (container, id) => container.querySelector(`[data-id="${id}"]`);

const domTemplateTask = getDOM(Dom.Template.TASK);
const domTaskColumn = domTemplateTask.parentNode;

const tasksModel = new TasksModel();
const taskController = new TasksController(tasksModel);

domTemplateTask.removeAttribute('id');
domTemplateTask.remove();

function renderTask(taskVO) {
  const domTaskClone = domTemplateTask.cloneNode(true);
  domTaskClone.dataset.id = taskVO.id;
  QUERY(domTaskClone, Dom.Template.Task.TITLE).innerText = taskVO.title;
  domTaskColumn.prepend(domTaskClone);
  console.log("renderTask #2")
  console.log(domTaskClone)

  return domTaskClone;
}

async function main() {
  tasksModel.addUpdateCallback((tasks) => {
    console.log('> addUpdateCallback', tasks);
    domTaskColumn.innerHTML = '';
    tasks.forEach((taskVo) => renderTask(taskVo));
  });
  tasksController.retrieveTasks();

  const taskOperations = {
    [Dom.Button.CREATE_TASK]: () => {
      renderTaskPopup(null, 'Create task', 'Create',
        (taskTitle, taskDate, taskTags) => {
          console.log('> Create task -> On Confirm');
          taskController.createTask(taskTitle, taskDate, taskTags);
        }
      );
    },
    [Dom.Template.Task.BTN_DELETE]: (taskVO, domTask) => {
      renderTaskPopup(
        taskVO,
        'Confirm delete task?',
        'Delete',
        (taskTitle, taskDate, taskTag) => {
          console.log('> Delete task -> On Confirm', {
            taskTitle,
            taskDate,
            taskTag,
          });
          const indexOfTask = tasks.indexOf(taskVO);
          tasks.splice(indexOfTask)
          domTaskColumn.removeChild(domTask);
          saveTask();
        }
      );
    },
    [Dom.Template.Task.BTN_EDIT]: (taskVO, domTask) => {
      renderTaskPopup(
        taskVO,
        'Update task',
        'Update',
        (taskTitle, taskDate, taskTag) => {
          console.log('> Update task -> On Confirm', {
            taskTitle,
            taskDate,
            taskTag,
          });
          taskVO.title = taskTitle;
          const domTaskUpdated = renderTask(taskVO);
          domTaskColumn.replaceChild(domTaskUpdated, domTask);
          saveTask();
        }
      );
    },
  };

  domTaskColumn.onclick = (e) => {
    e.stopPropagation();
    console.log('domTaskColumn', e.target);
    const domTaskElement = e.target;
    const taskBtn = domTaskElement.dataset.btn;
    console.log('e')
    console.log(e.target)
    const isNotTaskBtn = !taskBtn;
    console.log(domTaskElement.dataset)
    if (isNotTaskBtn) return;

    const allowedButtons = [
      Dom.Template.Task.BTN_EDIT,
      Dom.Template.Task.BTN_DELETE,
    ];
    console.log("if (!allowedButtons.includes(taskBtn)) return;")
    if (!allowedButtons.includes(taskBtn)) return;
    console.log("AFTER if (!allowedButtons.includes(taskBtn)) return;")
    let taskId;
    let domTask = domTaskElement;
    do {
      domTask = domTask.parentNode;
      taskId = domTask.dataset.id;
    } while (!taskId);

    const taskVO = tasks.find((task) => task.id === taskId);
    console.log('> taskVO:', taskVO);

    const taskOperation = taskOperations[taskBtn];
    if (taskOperation) {
      taskOperation(taskVO, domTask);
    }
  };

  getDOM(Dom.Button.CREATE_TASK).addEventListener('click',
    (e) => taskOperations[Dom.Button.CREATE_TASK]()
  );

  async function renderTaskPopup(taskVO, popupTitle, ConfirmText, processDataCallback) {
    const domPopupContainer = getDOM(Dom.Popup.CONTAINER);
    const domSpinner = domPopupContainer.querySelector('.spinner');

    domPopupContainer.classList.remove('hidden');

    const onClosePopup = () => {
      document.onkeyup = null;
      domPopupContainer.children[0].remove();
      domPopupContainer.append(domSpinner);
      domPopupContainer.classList.add('hidden');
    }

    const TaskPopup = (await import('./src/mvc/view/popup/TaskPopup')).default;
    const taskPopupInstasce = new TaskPopup(popupTitle, Tags, ConfirmText, (taskTitle, taskDate, taskTags) => {
      console.log('Main => processDataCallback', { taskTitle, taskDate, taskTags })
      processDataCallback(taskTitle, taskDate, taskTags);
      onClosePopup();
    },
      onClosePopup
    );

    if (taskVO) {
      taskPopupInstasce.TaskTitle = taskVO.title;
    }
  };

  delay(1000).then(() => {
    console.log('render 1');
    domSpinner.remove();
    document.onkeyup = (e) => {
      if (e.key === 'Escape') {
        onClosePopup();
      }
    };
    domPopupContainer.append(taskPopupInstance.render());
  });

  console.log('render 0');

  function saveTask() {
    localStorage.setItem(KEY_LOCAL_TASKS, JSON.stringify(tasks));
  }
}


main();