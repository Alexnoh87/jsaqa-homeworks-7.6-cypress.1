const {email, password} = require ("../fixtures/login.json");

describe('login tests', () => {

  beforeEach (() => {
    cy.visit('/')
  })

  it('test page display', () => {
    cy.visit('/')
    cy.contains('Books list').should('be.visible')
  })

  it('test login', () => {
    cy.login(email, password)
    cy.contains('Добро пожаловать bropet@mail.ru').should('be.visible')
  })

  it('test empty email', () => {
    cy.login(null, password)
    cy.get('#mail').then ((elements) => {
      expect(elements[0].checkValidity()).to.be.false
      expect(elements[0].validationMessage).to.be.eql("Заполните это поле.")
    })
  })

  it('test empty password', () => {
    cy.login(email, null)
    cy.get('#pass').then ((elements) => {
      expect(elements[0].checkValidity()).to.be.false
    })
  })
})