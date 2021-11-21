import pikachuFixture from '../fixtures/pikachu.json'
import pikachuCardFixture from '../fixtures/pikachu-card.json'
import pikachuTranslationSuccessFixture from '../fixtures/pikachu-translation.json'

describe('Shokemon Search', () => {

    describe('when result exists', () => {
        before(() => {

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

        it('should display a search result', () => {
            cy.get('article h3').invoke("text").should("eq", 'pikachu');
            cy.get('article img').should('have.attr', 'src', 'https://images.pokemontcg.io/basep/1_hires.png')
            cy.get('article p').invoke("text").should("eq", 'Translated text');
        })

    });

    describe('when result does not exist', () => {
        before(() => {

            cy.visit('http://localhost:3000');

            cy.intercept('https://pokeapi.co/api/v2/pokemon-species/x12', {
                statusCode: 404
            })

            cy.get('input[type=text]').type('x12');
            cy.get('button#search-btn').click()
            cy.get('button#search-btn').click()
        })

        it('should display a search result', () => {
            cy.get('h3').invoke("text").should("eq", 'No results! Try another search.');
        })

    });
})