import pikachuFixture from '../fixtures/pikachu.json'
import pikachuCardFixture from '../fixtures/pikachu-card.json'
import pikachuTranslationFailFixture from '../fixtures/pikachu-translation-failed.json'
import pikachuTranslationSuccessFixture from '../fixtures/pikachu-translation.json'

describe('Shokemon Translation', () => {

    describe('when translation succeeds', () => {
        before(() => {

            cy.visit('http://localhost:3000');

            cy.intercept('https://pokeapi.co/api/v2/pokemon-species/pikachu', {
                body: pikachuFixture
            })

            cy.intercept('https://api.pokemontcg.io/v2/cards?q=name:pikachu', {
                body: pikachuCardFixture
            })

            cy.intercept('https://api.funtranslations.com/translate/shakespeare.json?text=When%20several%20of%20these%20POK%C3%A9MON%20gather%2C%20their%0Celectricity%20could%20build%20and%20cause%20lightning%20storms.', {
                body: pikachuTranslationSuccessFixture,
                statusCode: 200
            })



            cy.get('input[type=text]').type('pikachu');
            cy.get('button#search-btn').click()
            cy.get('button#search-btn').click()

            cy.wait(2000)
        })

        it('should display the translated text', () => {
            cy.get('article p').invoke("text").should("eq", 'Translated text');
        })

    });

    describe('when translation fails', () => {
        before(() => {

            cy.visit('http://localhost:3000');

            cy.intercept('https://pokeapi.co/api/v2/pokemon-species/pikachu', {
                body: pikachuFixture
            })

            cy.intercept('https://api.pokemontcg.io/v2/cards?q=name:pikachu', {
                body: pikachuCardFixture
            })

            cy.intercept('https://api.funtranslations.com/translate/shakespeare.json?text=When%20several%20of%20these%20POK%C3%A9MON%20gather%2C%20their%0Celectricity%20could%20build%20and%20cause%20lightning%20storms.', {
                body: pikachuTranslationFailFixture,
                statusCode: 429
            })

            cy.get('input[type=text]').type('pikachu');
            cy.get('button#search-btn').click()
            cy.get('button#search-btn').click()

            cy.wait(2000)
        })

        it('should display original description as fallback', () => {
            cy.get('article p').invoke("text").should("eq", 'When several of these POKéMON gather, their\felectricity could build and cause lightning storms.');
        })

    });
})