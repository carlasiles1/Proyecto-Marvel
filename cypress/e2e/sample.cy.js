describe('Página de inicio de Marvel', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080/'); // Asegúrate de que tu servidor de desarrollo está corriendo
      cy.wait(2000); // Espera 2 segundos para asegurarse de que la página cargue
    });
  
    it('Debe mostrar el logo de Marvel', () => {
      cy.get('.logo').should('be.visible');
    });
  
  });
  