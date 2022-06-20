describe('Caso de uso: Registrar otros administradores', () => {
  it('Escenario principal', () => {

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)
  
    cy.visit('http://localhost:3000/heritage_admin_register')

    cy.get('input[id="name"]').type('PruebaNombre')
    cy.get('input[id="username"]').type('Prueba')
    cy.get('input[id="password"]').type('aC12345678*')
    cy.get('input[id="repeatPassword"]').type('aC12345678*')

    cy.get('button').contains('Registrar').click();

    cy.wait(500)

    cy.get('button').contains('Cerrar sesión').click();

    cy.contains("Subida de cartas").should('not.exist');
    cy.contains("Editor Historia").should('not.exist');
    cy.contains("Cerrar sesión").should('not.exist');

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Prueba')
    cy.get('input[id*="password"]').type('aC12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.contains("Subida de cartas").should('exist');
    cy.contains("Editor Historia").should('exist');
    cy.contains("Cerrar sesión").should('exist');

  }),
  it('Escenario Alternativo 1', () => {

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)
  
    cy.visit('http://localhost:3000/heritage_admin_register')

    cy.get('input[id="name"]').type('PruebaNombre')
    cy.get('input[id="username"]').type('Prueba')
    cy.get('input[id="password"]').type('a123478')
    cy.get('input[id="repeatPassword"]').type('a123478')

    cy.get('button').contains('Registrar').click();

    cy.contains("Ha ocurrido un error: La contraseña debe tener un tamaño de mínimo 8 caracteres y contener al menos un número, una letra minúscula, una letra mayúscula y un caracter especial.")
    .should("exist")

    cy.wait(500)

    cy.get('button').contains('Cerrar sesión').click();

    cy.contains("Subida de cartas").should('not.exist');
    cy.contains("Editor Historia").should('not.exist');
    cy.contains("Cerrar sesión").should('not.exist');

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Prueba')
    cy.get('input[id*="password"]').type('a123478*')
    cy.get('button').contains('Login').click();
    cy.wait(500)
    cy.contains("Información Inválida, revisa usuario y contraseña").should("exist")

    cy.contains("Subida de cartas").should('not.exist');
    cy.contains("Editor Historia").should('not.exist');
    cy.contains("Cerrar sesión").should('not.exist');  

  }),
  it('Escenario Alternativo 2', () => {

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)
  
    cy.visit('http://localhost:3000/heritage_admin_register')

    cy.get('input[id="name"]').type('PruebaNombre')
    cy.get('input[id="username"]').type('Prueba')
    cy.get('input[id="password"]').type('a123478')

    cy.get('button').contains('Registrar').click();

    cy.contains("Escribe una contraseña y repítela correctamente.")
    .should("exist")

    cy.wait(500)

    cy.get('button').contains('Cerrar sesión').click();

    cy.contains("Subida de cartas").should('not.exist');
    cy.contains("Editor Historia").should('not.exist');
    cy.contains("Cerrar sesión").should('not.exist');

    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Prueba')
    cy.get('input[id*="password"]').type('a123478*')
    cy.get('button').contains('Login').click();
    cy.wait(500)
    cy.contains("Información Inválida, revisa usuario y contraseña").should("exist")

    cy.contains("Subida de cartas").should('not.exist');
    cy.contains("Editor Historia").should('not.exist');
    cy.contains("Cerrar sesión").should('not.exist');  

  })

  it('Escenario Alternativo 3', () => {

    
    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)
  
    cy.visit('http://localhost:3000/heritage_admin_register')

    cy.get('input[id="name"]').type('PruebaNombre')
    cy.get('input[id="username"]').type('Prueba')
    cy.get('input[id="password"]').type('aC12345678*')
    cy.get('input[id="repeatPassword"]').type('aC12345678*')

    cy.get('button').contains('Registrar').click();

    cy.wait(500)

    cy.contains("Información Inválida, revisa usuario y contraseña Ese nombre de usuario ya existe.").should('exist'); 

  })

})