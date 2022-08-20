describe('frontend: RecordButton component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=recordbutton--primary'));
    
    it('should render the component', () => {
      cy.get('h1').should('contain', 'Welcome to RecordButton!');
    });
});
