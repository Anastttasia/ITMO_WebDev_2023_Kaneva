import Dom from '../../src/const/DOM';

const SERVER_URL = 'http://localhost:5182/';

describe('Test Todo Page', () => {

  const clickCreateTaskButton = () =>
    cy
      .get(`#${Dom.Button.CREATE_TASK}`)
      .should('exist')
      .should('contain.text', 'Create Task')
      .click();

  const todoTaskText = 'Welcome Task';

  const createTaskFromPopup = (todoTaskText) => {
    const popupTask = cy.get('[data-test-id="task-popup"]');

    popupTask.should('exist').should('be.visible');
    popupTask
      .find('[data-id="inpTitle"]')
      .should('exist')
      .should('have.value', '')
      .type(todoTaskText);

    cy.get('[data-id="btnConfirm"]')
      .should('exist')
      .should('contain.text', 'Create')
      .click();
  }

  const getColumnChildren = () =>
    cy.get('[data-test-id="tasks-column"]')
      .should('exist')
      .children()

  const checkNumberOfColumnMatch = (numberOfTasks) => {
    getColumnChildren()
    .should('have.length', numberOfTasks + 1)
  }

  beforeEach(() => {
    cy.visit(SERVER_URL);
    cy.url().should('include', SERVER_URL);
    cy.intercept('**TaskPopup**').as('getTaskPopup');
  })

  it('user open main page and create task', () => {
    cy.get(`#${Dom.Popup.CONTAINER}`)
      .should('exist')
      .should('have.class', 'hidden');

    cy.get(`#${Dom.Popup.CONTAINER}`)
      .should('exist')
      .should('have.class', 'hidden')
      .find('.spinner')
      .should('exist');

    clickCreateTaskButton();
    cy.wait('@getTaskPopup');

    // const todoTaskText = 'Welcome Task';
    createTaskFromPopup();

    getColumnChildren()
      .should('have.length', 2)
      .first()
      .find('[data-id="tempalateTaskTitle"]')
      .should('contain.text', todoTaskText);
  });

  it.only('user create tasks and delete one', () => {
    const tasks = ['Welcome Task', 'Read books'];
    tasks.forEach((text, index) => {
      clickCreateTaskButton();
      if (index === 0) cy.wait('@getTaskPopup');
      createTaskFromPopup(text);
    });

    checkNumberOfColumnMatch(tasks.length);
    getColumnChildren()
      .first()
      .find('[data-btn="btnDelete"]')
      .should('exist')
      .click();

      const popupTask = cy.get('[data-test-id="task-popup"]');
      popupTask
      .find('[data-id="btnConfirm"]')
      .should('exist')
      .should('contain.text', 'Delete')
      .click();

      tasks.pop();

      checkNumberOfColumnMatch(tasks.length);
      tasks.forEach((text) => {
        getColumnChildren().should('contain.text', text);
      })
  });
});