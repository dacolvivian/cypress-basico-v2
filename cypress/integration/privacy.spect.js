//Não é necessário um describe, pois é só um teste

it('testa a página da política de privacidade de forma independente', function(){
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')//Sendo assim é possível fazer uma validação.
})