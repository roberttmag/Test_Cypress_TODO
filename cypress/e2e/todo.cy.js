describe('Gerenciamento de Tarefas', () => {
    beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/index.html'); 
    });
  
    it('Cadastrar uma nova tarefa', () => {
      cy.get('#todo_title').type('Nova tarefa');
      cy.get('button.btn-primary').click();
      cy.get('tbody').should('contain', 'Nova tarefa');
    });
  
    it('Tentar cadastrar uma tarefa em branco', () => {
        cy.get('button.btn-primary').click();
        cy.on('window:alert', (str) => {
          expect(str).to.equal('Digite um título para a tarefa!');
        });
      });
  
      it('Excluir uma tarefa', () => {
        cy.get('#todo_title').type('Nova tarefa');
        cy.get('button.btn-primary').click();
        cy.get('.btn-danger').first().should('exist').should('be.visible');
        cy.get('.btn-danger').first().click();
        cy.on('window:confirm', () => true);
        cy.get('tbody').should('not.contain', 'Nova tarefa');
      });
  
    it('Filtrar tarefas concluídas', () => {
        cy.get('#todo_title').type('Nova tarefa');
        cy.get('button.btn-primary').click();
        cy.get('.form-check-input').click();
        cy.get('select').should('exist').should('be.visible');
        cy.get('select').select('Concluídos');
        cy.get('tbody tr').each(tarefa => {
            expect(tarefa).to.have.class('completed');
        });
    });

    it('Filtrar tarefas em aberto', () => {
        cy.get('#todo_title').type('Nova tarefa');
        cy.get('button.btn-primary').click();
        cy.get('select').should('exist').should('be.visible');
        cy.get('select').select('Em aberto');
        cy.get('tbody tr').each(tarefa => {
            expect(tarefa).to.not.have.class('completed');
    
    });

});
it('Exibir data de registro ao cadastrar uma nova tarefa', () => {
    cy.get('#todo_title').type('Nova tarefa');
    cy.get('button.btn-primary').click();
    cy.get('[x-text="getFormatedDate(todo.createdAt)"]').should('not.be.empty');
 
  });
});