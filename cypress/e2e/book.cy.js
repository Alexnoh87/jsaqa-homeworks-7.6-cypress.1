const {email, password} = require ("../fixtures/login.json");
const {titleBook1, titleBook2, description, author} = require ("../fixtures/book.json");

describe('book tests', () => {

    beforeEach (() => {
      cy.visit('/')
      cy.login(email, password)
    })
  
    it('test add new book1', () => {
      cy.addNew(titleBook1, description, author)
      cy.contains(titleBook1).should('be.visible')
    })
  
    it('test when adding a book add to favorites', () => {
      cy.addNewBookAndFavorites(titleBook2, description, author)
      cy.contains(titleBook2).should('be.visible')
    })
  
    it.only('test add a book to favorites on the books page', () => {
      cy.contains(titleBook1).should('be.visible')
        .within(() => {
          cy.contains('Add to favorite').click()
        })
      cy.contains('Favorites').click()  
      cy.contains(titleBook1).should('be.visible')
    })
  
    it('test delete from favorite', () => {
      cy.contains('Favorites').click()
      cy.contains(titleBook2).should('be.visible')
        .within(() => { 
          cy.contains('Delete from favorite').click()
        });
    })
  })