class TasksModel {
  #tasks = [];
  #updateCallbacks = [];
  constructor() { }

  set tasks(value) {
    this.#tasks = value;
    this.#notify();
  }

  #notify() {
    this.#updateCallbacks.forEach(c => c(this.#tasks));
  }

  getTaskById(id) {
    const taskId = parseInt(id);
    const taskVO = this.#tasks.find((task) => task.id === taskId);
    console.log('TasksModel -> taskVO:', taskVO);
    return taskVO;
  }

  addUpdateCallback(updateCallback) {
    if (!updateCallback || !(updateCallback instanceof Function)) {
      throw new Error(`Wrong callback: ${updateCallback}`);
    }
    this.#updateCallbacks.push(updateCallback);
  }

  deleteTaskById(taskId) {
    console.log('> TasksModel -> deleteTaskById', taskId);
    const index = this.#tasks.findIndex((taskVO) => taskVO.id == taskId);
    this.#tasks.splice(index, 1);
    this.#notify();
  }

  addTask(taskVO) {
    console.log('> TasksModel -> addTask', taskVO);
    this.#tasks.push(taskVO);
    this.#notify();
  }

  updateTaskById(taskId, data) {
    console.log('> TasksModel -> updateTask', { taskId, data });
    const taskVO = this.getTaskById(taskId);
    Object.assign(taskVO, data);
    this.#notify();
  }
}

export default TasksModel;