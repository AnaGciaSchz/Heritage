describe('Caso de uso: Leer Historia de la EII', () => {
  it('Escenario principal', () => {

    cy.visit('http://localhost:3000/')


    cy.get('button[title*="Historia de la EII"]').click()

    cy.url().should('include', '/HistoriaEII')

    cy.get('h1').contains('Historia de la EII')
    cy.get('span[style*="font-family: Arial; font-size: 20px; color: rgb(57, 181, 74)"]').contains('Introducción').should('exist')
  }),
  it('Escenario Alternativo 1', () => {

    cy.visit({url: 'http://localhost:3000/ru/HistoriaEII', failOnStatusCode: false})

    cy.url().should('include', '/404')

    cy.get('h1').contains('No se ha podido encontrar un recurso')
  })

  it('Escenario Alternativo 2', () => {

    cy.visit('http://localhost:3000/')


    cy.get('button[title*="Historia de la EII"]').click()

    cy.url().should('include', '/HistoriaEII')

    cy.get('h1').contains('Historia de la EII')
    cy.get('span[style*="font-family: Arial; font-size: 20px; color: rgb(57, 181, 74)"]').contains('Introducción').should('exist')


    cy.contains('Asturianu').click()
    cy.url().should('include', '/ast/HistoriaEII')
    cy.get('h1').contains('Hestoria de la EII')
    cy.get('span[style*="font-family: Arial; font-size: 20px; color: rgb(57, 181, 74)"]').contains('Introducción').should('exist')

  })
})