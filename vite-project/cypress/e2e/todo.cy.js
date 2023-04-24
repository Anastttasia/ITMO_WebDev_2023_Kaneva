import Dom from '../../src/const/DOM' 

describe('Create Todo', () => {
  it('user open main page and create task', () =>{
    cy.visit('http://localhost:5179/');

    cy.get(`#${Dom.Button.CREATE_TASK}`)
      .should('exist')
      .should('contain.text', '+ Create Task')
      .click();
  });
});