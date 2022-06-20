describe('Caso de uso: Eliminar cartas', () => {
  it('Escenario principal', () => {
    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')

    cy.get('button').contains('Login').click();

    cy.wait(500)

    cy.visit('http://localhost:3000/')

    cy.get('button[title*="Subida de cartas"]').click()

    cy.url().should('include', '/SubidaDeCartas')

    cy.get('h1').contains('Formulario de subida de cartas').should('exist')
    cy.get('h2').contains('Escribe la información').should('exist')

    cy.get('select[aria-label*="Elige el tipo de carta"]').select('egresado')
    cy.get('input[placeholder*="Ana María García Sánchez"]').type('Usuario de prueba')
    cy.get('input[placeholder*="2021-2022"]').type('2021-2022')
    cy.get('textarea[placeholder*="Esto es una descripción corta."]').type('Esto es una descripción corta.')

    cy.fixture('/AnaGs.jpg').then(fileContent => {
      cy.get('input[type="file"]').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'AnaGs.jpg',
          mimeType: 'image/jpg'
        })
      });

      cy.get('textarea[placeholder*="Esto es un ejemplo de una descripción larga, de esta forma se entiende mejor qué es lo que se debería escribir aquí."]').type('Esto es una descripción larga.')
      cy.get('textarea[placeholder*="Logros destacables como egresado, profesor o delegado según tipo de carta"]').type('logros')

      cy.get('input[id*="check"]').check()

      cy.get('button').contains('Añadir red social').click();
      cy.get('input[id*="social1Text"]').type("red1")
      cy.get('input[placeholder*="Introduce el link de tu primera red social"]').type("https://twitter.com/computingoviedo")

      cy.get('button').contains('Añadir red social').click();
      cy.get('input[id*="social2Text"]').type("red2")
      cy.get('input[placeholder*="Introduce el link de tu segunda red social"]').type("https://twitter.com/computingoviedo")

      cy.get('button').contains('Añadir red social').click();
      cy.get('input[id*="social3Text"]').type("red3")
      cy.get('input[placeholder*="Introduce el link de tu tercera red social"]').type("https://twitter.com/computingoviedo")

      cy.get('button').contains('Subir carta').click();
      cy.contains("La carta se ha subido correctamente").should("exist")

      cy.wait(500)

      cy.get('button[title*="Zona Egresados"]').click()

    cy.url().should('include', '/ZonaEgresados')
    cy.get('h1').contains('Zona Egresados')
    cy.contains("Usuario de prueba").should('exist')
    cy.get('input[id*="searchBar"]').type('Usuario de prueba')
    cy.wait(10000)
    cy.get("h4").contains("Usuario de prueba").should('exist')
    cy.get("h4").contains("Usuario de prueba").click()
    cy.get('button').contains('Eliminar').click();
    cy.on('window:confirm', () => true);
    cy.get('input[id*="searchBar"]').clear()
    cy.get('input[id*="searchBar"]').type('Usuario de prueba')
    cy.wait(10000)
    cy.contains("Usuario de prueba").should('not.exist') 


  }),

  it('Escenario Alternativo 1', () => {
    cy.visit('http://localhost:3000/heritage_admin_login')

    cy.get('input[id*="username"]').type('Petra')
    cy.get('input[id*="password"]').type('aB12345678*')
  
    cy.get('button').contains('Login').click();
  
    cy.wait(500)
  
    cy.visit('http://localhost:3000/')
  
  
    cy.get('button[title*="Subida de cartas"]').click()
  
    cy.url().should('include', '/SubidaDeCartas')
  
    cy.get('h1').contains('Formulario de subida de cartas').should('exist')
    cy.get('h2').contains('Escribe la información').should('exist')
  
    cy.get('select[aria-label*="Elige el tipo de carta"]').select('egresado')
    cy.get('input[placeholder*="Ana María García Sánchez"]').type('Usuario de prueba')
    cy.get('input[placeholder*="2021-2022"]').type('2021-2022')
    cy.get('textarea[placeholder*="Esto es una descripción corta."]').type('Esto es una descripción corta.')
    cy.fixture('/AnaGs.jpg').then(fileContent => {
      cy.get('input[type="file"]').attachFile({
          fileContent: fileContent.toString(),
          fileName: 'AnaGs.jpg',
          mimeType: 'image/jpg'
        })
      });
      cy.get('textarea[placeholder*="Esto es un ejemplo de una descripción larga, de esta forma se entiende mejor qué es lo que se debería escribir aquí."]').type('Esto es una descripción larga.')
      cy.get('textarea[placeholder*="Logros destacables como egresado, profesor o delegado según tipo de carta"]').type('logros')
  
      cy.get('input[id*="check"]').check()
  
      cy.get('button').contains('Añadir red social').click();
      cy.get('input[id*="social1Text"]').type("red1")
      cy.get('input[placeholder*="Introduce el link de tu primera red social"]').type("https://twitter.com/computingoviedo")
  
      cy.get('button').contains('Añadir red social').click();
      cy.get('input[id*="social2Text"]').type("red2")
      cy.get('input[placeholder*="Introduce el link de tu segunda red social"]').type("https://twitter.com/computingoviedo")
  
      cy.get('button').contains('Añadir red social').click();
      cy.get('input[id*="social3Text"]').type("red3")
      cy.get('input[placeholder*="Introduce el link de tu tercera red social"]').type("https://twitter.com/computingoviedo")
  
      cy.get('button').contains('Subir carta').click();
      cy.contains("La carta se ha subido correctamente").should("exist")
  
      cy.wait(500)
  
      cy.get('button[title*="Zona Egresados"]').click()
  
    cy.url().should('include', '/ZonaEgresados')
  
    cy.get('h1').contains('Zona Egresados')
    cy.contains("Usuario de prueba").should('exist')
    cy.get('input[id*="searchBar"]').type('Usuario de prueba')
    cy.wait(10000)
    cy.get("h4").contains("Usuario de prueba").should('exist')
    cy.get("h4").contains("Usuario de prueba").click()
    cy.get('button').contains('Eliminar').click();
    cy.on('window:confirm', () => false);
    cy.get('input[id*="searchBar"]').clear()
    cy.get('input[id*="searchBar"]').type('Usuario de prueba')
    cy.wait(10000)
    cy.contains("Usuario de prueba").should('exist')
  })

})