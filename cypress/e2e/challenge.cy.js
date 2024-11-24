
describe('1 - Confere se o site está online', () => {
  it('1.1 - Verifica se o site está online', () => {
    cy.visit('/')
  });  
});

describe('2 - Título da página', () => {
  it('2.1 - Verifica o título da página no HEAD está correto', () => {
    cy.visit('/')
    cy.title().should('eq', 'Batalha Naval')
  });

  it('2.2 - Verifica o título da página no BODY está correto', () => {
    cy.visit('/')
    cy.get('h1').should('have.text', 'Batalha Naval')
  });
});

describe('3 - Página e textos', () => {
  it('3.1 - Verifica se o texto de instruções está correto', () => {
    cy.visit('/')
    cy.get('p').should('have.text', 'Clique em uma célula para tentar acertar o navio.');
  });

  it('3.2 - Verifica se existe um link para o site da DEUXYS', () => {
    cy.visit('/')
    cy.get('a').should('exist')
      .and('have.attr', 'href', 'https://deuxys.com.br/')
      .and('have.text', 'DEUXYS')
  });
});

describe('4 - Estrutura do mapa', () => {
  it('4.1 - Verifica se a tabela existe na página', () => {
    cy.visit('/')
    cy.get('table').should('exist').and('has.attr', 'border', '1')
  });

  it('4.2 - Verifica se a tabela tem 5 linhas', () => {
    cy.visit('/')
    cy.get('table tr').should('have.length', 5)
  });

  it('4.3 - Verifica se a tabela tem 5 colunas', () => {
    cy.visit('/')
    cy.get('table tr').first().find('td').should('have.length', 5)
  });

  it('4.4 - Confere se as células são nomeadas corretamente', () => {
    cy.visit('/')
    cy.get('table').find('tr').each(($tr, i) => {
      const letras = ['A', 'B', 'C', 'D', 'E']
      cy.wrap($tr).find('td').each(($td, j) => {
        cy.wrap($td).should('contain.text', letras[j] + (i + 1))
      })
    });
  });
});