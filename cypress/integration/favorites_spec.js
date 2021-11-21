import pikachuFixture from '../fixtures/pikachu.json'
import pikachuCardFixture from '../fixtures/pikachu-card.json'
import pikachuTranslationSuccessFixture from '../fixtures/pikachu-translation.json'

describe('Shokemon Favorites', () => {

    before(() => {

        cy.clearLocalStorageSnapshot();

        cy.visit('http://localhost:3000');

        cy.intercept('https://pokeapi.co/api/v2/pokemon-species/pikachu', {
            body: pikachuFixture
        })

        cy.intercept('https://api.pokemontcg.io/v2/cards?q=name:pikachu', {
            body: pikachuCardFixture
        })

        cy.intercept('https://api.funtranslations.com/translate/shakespeare.json?text=When%20several%20of%20these%20POK%C3%A9MON%20gather%2C%20their%0Celectricity%20could%20build%20and%20cause%20lightning%20storms.', {
            body: pikachuTranslationSuccessFixture
        })

        cy.get('input[type=text]').type('pikachu');
        cy.get('button#search-btn').click()
        cy.get('button#search-btn').click()
    })


    beforeEach(() => {
        cy.restoreLocalStorage();
    });

    afterEach(() => {
        cy.saveLocalStorage();
    });

    it('should display in favorites list when favorite button pressed', () => {
        cy.get('article button').click()
        cy.get('ul#favorites').children().should('have.length', 1);
        cy.get('ul#favorites article h3').invoke("text").should("eq", 'pikachu');
        cy.get('ul#favorites article img').should('have.attr', 'src', 'https://images.pokemontcg.io/basep/1_hires.png')
        cy.get('ul#favorites article p').invoke("text").should("eq", 'Translated text');
    })

    it('should retain favorites after a page reload', () => {
        cy.reload();
        cy.get('ul#favorites').children().should('have.length', 1);
        cy.get('ul#favorites article h3').invoke("text").should("eq", 'pikachu');
        cy.get('ul#favorites article img').should('have.attr', 'src', 'https://images.pokemontcg.io/basep/1_hires.png')
        cy.get('ul#favorites article p').invoke("text").should("eq", 'Translated text');
    })

    it('should remove from favorites list when favorite button pressed again', () => {
        cy.get('ul#favorites article button').click()
        cy.get('ul#favorites').should('not.exist');
    })
})