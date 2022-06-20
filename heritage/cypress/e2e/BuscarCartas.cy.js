describe('Caso de uso: Buscar cartas', () => {
  it('Escenario principal', () => {
    cy.visit('http://localhost:3000/')


    cy.get('button[title*="Zona Egresados"]').click()

    cy.url().should('include', '/ZonaEgresados')

    cy.get('h1').contains('Zona Egresados')
    cy.contains("Miguel Martinez Alvarez").should('exist');
    cy.get('input[value*="2021-2022"]').check()
    cy.contains("Miguel Martinez Alvarez").should('not.exist');
    cy.contains("Cristina Martín Rey").should('exist');
    cy.contains("Ángel García Menéndez").should('exist');



  }),
  it('Escenario Alternativo 1', () => {
    cy.visit('http://localhost:3000/')


    cy.get('button[title*="Zona Egresados"]').click()

    cy.url().should('include', '/ZonaEgresados')

    cy.get('h1').contains('Zona Egresados')
    cy.contains("Miguel Martinez Alvarez").should('exist');
    cy.contains("Diego Suárez García").should('exist');
    cy.contains("Andrés Vigil Rodríguez").should('exist');
    cy.contains("Pablo González Jiménez").should('exist');
    cy.contains("María Leyva-Vallina").should('exist');
    cy.contains("Ángel García Menéndez").should('exist');

  })

  it('Escenario Alternativo 2', () => {

    cy.visit('http://localhost:3000/')


    cy.get('button[title*="Zona Egresados"]').click()

    cy.url().should('include', '/ZonaEgresados')

    cy.get('h1').contains('Zona Egresados')
    cy.contains("Miguel Martinez Alvarez").should('exist');
    cy.get('input[value*="2021-2022"]').check()
    cy.contains("Miguel Martinez Alvarez").should('not.exist');
    cy.contains("Cristina Martín Rey").should('exist');
    cy.contains("Ángel García Menéndez").should('exist');
    cy.wait(500)
    cy.get('input[value*="mastodon"]').check()
    cy.contains("Cristina Martín Rey").should('not.exist');
    cy.wait(500)
    cy.get('input[value*="mastodon"]').uncheck()
    cy.contains("Cristina Martín Rey").should('exist');
    cy.get('input[id*="searchBar"]').type('Angel')
    cy.contains("Cristina Martín Rey").should('not.exist');
    

  })

  it('Escenario Alternativo 3', () => {

    cy.visit('http://localhost:3000/')


    cy.get('button[title*="Zona Egresados"]').click()

    cy.url().should('include', '/ZonaEgresados')

    cy.get('h1').contains('Zona Egresados')
    cy.get('input[id*="searchBar"]').type('xcvcxvcxvcxv')
    cy.contains("No hay resultados").should('exist');
    cy.get('p').contains('¿No encuentras a la persona que estás buscando? ¡Prueba en otra sección!')
    

  })
})