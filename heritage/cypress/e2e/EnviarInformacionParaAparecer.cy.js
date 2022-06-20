describe('Caso de uso: Enviar su información para aparecer en la web', () => {
  it('Escenario principal', () => {
    cy.visit('http://localhost:3000/')


    cy.get('button[title*="¿Qué es Heritage?"]').click()

    cy.url().should('include', '/about')

    cy.get('h1').contains('Sobre Heritage')
    cy.contains("Ana María García Sánchez").should('exist');
    cy.contains("Formulario para aparecer en Heritage").should('exist');
    cy.get('a').contains('Formulario para aparecer en Heritage')

  })
})