/// <reference types="cypress" />
const { faker } = require('@faker-js/faker');

describe('Funcionalidade Pré Cadastro', () => {

    beforeEach(() => {
        cy.visit('minha-conta')        
    });

    it('Deve completar o pré cadatro com sucesso', () =>{
        let nomeFaker = faker.name.firstName();
        let sobreNomeFaker = faker.name.lastName();
        let emailFaker = faker.name.email(nomeFaker, sobreNomeFaker);

        cy.get('#reg_email').type(emailFaker)
        cy.get('#reg_password').type('teste@teste')
        cy.get(':nth-child(4) > .button').click()

        cy.get('.woocommerce-MyAccount-navigation-link--edit-account > a').click()
        cy.get('#account_first_name').type(nomeFaker)
        cy.get('#account_last_name').type(sobreNomeFaker)
        cy.get('.woocommerce-Button').click()

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });

    it('Deve completar o pré cadatro com sucesso usando comando customizados', () =>{
        let nomeFaker = faker.name.firstName();
        let sobreNomeFaker = faker.name.lastName();
        let emailFaker = faker.internet.email(nomeFaker, sobreNomeFaker);

        cy.preCadastro(emailFaker, 'senha!@#forte', nomeFaker, sobreNomeFaker)

        cy.get('.woocommerce-message').should('contain', 'Detalhes da conta modificados com sucesso.')
    });
});
