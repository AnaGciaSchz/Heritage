describe('Caso de uso: Iniciar sesión', () => {
  it('Escenario principal', () => {
    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.contains("Subida de cartas").should('not.exist');
    cy.contains("Editor Historia").should('not.exist');
    cy.contains("Cerrar sesión").should('not.exist');

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.contains("Subida de cartas").should('exist');
    cy.contains("Editor Historia").should('exist');
    cy.contains("Cerrar sesión").should('exist');
  }),
  it('Escenario Alternativo 1', () => {

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.contains("Subida de cartas").should('not.exist');
    cy.contains("Editor Historia").should('not.exist');
    cy.contains("Cerrar sesión").should('not.exist');

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB13345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.contains("Información Inválida, revisa usuario y contraseña").should('exist')
    cy.get('a[class*="close"]').click();
    cy.contains("Información Inválida, revisa usuario y contraseña").should('not.exist')

    cy.get('input[id*="username"]').type('Potra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.contains("Información Inválida, revisa usuario y contraseña").should('exist')

  })

  it('Escenario Alternativo 2', () => {

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.contains("Subida de cartas").should('not.exist');
    cy.contains("Editor Historia").should('not.exist');
    cy.contains("Cerrar sesión").should('not.exist');

    cy.get('input[id*="username"]').type('Petra')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.contains("Ha ocurrido un error: La contraseña está vacía.").should('exist')
    cy.get('a[class*="close"]').click();
    cy.contains("Ha ocurrido un error: La contraseña está vacía.").should('not.exist')

    cy.get('input[id*="username"]').clear()
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.contains("El username está vacío.").should('exist')

    

  })
})