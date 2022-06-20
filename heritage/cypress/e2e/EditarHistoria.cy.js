describe('Caso de uso: Editar Historia de la EII', () => {
  it('Escenario principal', () => {

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.visit('http://localhost:3000/')

    cy.get('button[title*="Editor Historia"]').click()

    cy.url().should('include', '/EditorHistoria')

    cy.get('h1').contains('Editor de la Historia de la EII').should('exist')
    cy.get('span[style*="font-family: Arial; font-size: 20px; color: rgb(57, 181, 74)"]').contains('Introducción').should('exist')

    cy.get('div[class*="se-wrapper-inner se-wrapper-wysiwyg sun-editor-editable"]').type('\n¡¡Hola!! Esto es un test')

    cy.get('button').contains('Guardar').click();
    cy.contains("El texto se ha subido correctamente").should('exist')

    cy.visit('http://localhost:3000/HistoriaEII')
    cy.get('h1').contains('Historia de la EII').should('exist')
    cy.contains('¡¡Hola!! Esto es un test').should('exist')

  }),
  it('Escenario Alternativo 1', () => {

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.visit({url: 'http://localhost:3000/ru/EditorHistoria', failOnStatusCode: false})

    cy.url().should('include', '/404')

    cy.get('h1').contains('No se ha podido encontrar un recurso')

    

  })

  it('Escenario Alternativo 2', () => {

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)


    cy.visit('http://localhost:3000/')


    cy.get('button[title*="Editor Historia"]').click()

    cy.url().should('include', '/EditorHistoria')

    cy.get('h1').contains('Editor de la Historia de la EII').should('exist')
    cy.get('span[style*="font-family: Arial; font-size: 20px; color: rgb(57, 181, 74)"]').contains('Introducción').should('exist')


    cy.contains('Asturianu').click()
    cy.url().should('include', '/ast/EditorHistoria')
    cy.get('h1').contains('Editor de la Hestoria de la EII')
    cy.get('span[style*="font-family: Arial; font-size: 20px; color: rgb(57, 181, 74)"]').contains('Introducción').should('exist')
    

  }),
  it('Escenario Alternativo 3', () => {

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.visit('http://localhost:3000/')

    cy.get('button[title*="Editor Historia"]').click()

    cy.url().should('include', '/EditorHistoria')

    cy.get('h1').contains('Editor de la Historia de la EII').should('exist')
    cy.get('span[style*="font-family: Arial; font-size: 20px; color: rgb(57, 181, 74)"]').contains('Introducción').should('exist')


    cy.get('button').contains('Guardar').click();
    cy.contains("El texto se ha subido correctamente").should('exist')
  }),
  it('Escenario Alternativo 4', () => {

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.visit('http://localhost:3000/')

    cy.get('button[title*="Editor Historia"]').click()

    cy.url().should('include', '/EditorHistoria')

    cy.get('h1').contains('Editor de la Historia de la EII').should('exist')
    cy.get('span[style*="font-family: Arial; font-size: 20px; color: rgb(57, 181, 74)"]').contains('Introducción').should('exist')

    cy.get('div[class*="se-wrapper-inner se-wrapper-wysiwyg sun-editor-editable"]').type('\n¡¡Hola!! Esto no debería existir')

    cy.visit('http://localhost:3000/HistoriaEII')
    cy.get('h1').contains('Historia de la EII').should('exist')
    cy.contains('¡¡Hola!! Esto no debería existir').should('not.exist')



  })
})