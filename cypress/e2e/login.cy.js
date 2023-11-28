const {email, password, titleBook1, titleBook2, description, author} = require ("../fixtures/example.json");

describe('template spec', () => {

  beforeEach (() => {
    cy.visit('/')
  })

  it('test page display', () => {
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

  it('test add new book1', () => {
    cy.login(email, password)
    cy.addNew(titleBook1, description, author)
    cy.contains(titleBook1).should('be.visible')
  })

  it('test when adding a book add to favorites', () => {
    cy.login(email, password)
    cy.addNewBookAndFavorites(titleBook2, description, author)
    cy.contains(titleBook2).should('be.visible')
  })

  it.only('test add a book to favorites on the books page', () => {
    cy.login(email, password)
    cy.contains(titleBook1).should('be.visible')
      .within(() => {
        cy.contains('Add to favorite').click()
      })
    cy.contains('Favorites').click()  
    cy.contains(titleBook1).should('be.visible')
  })

  it('test delete from favorite', () => {
    cy.login(email, password)
    cy.contains('Favorites').click()
    cy.contains(titleBook2).should('be.visible')
      .within(() => { 
        cy.contains('Delete from favorite').click()
      });
  })
})