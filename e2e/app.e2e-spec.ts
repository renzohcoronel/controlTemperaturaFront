import { ControlTemperaturaFrontPage } from './app.po';

describe('control-temperatura-front App', () => {
  let page: ControlTemperaturaFrontPage;

  beforeEach(() => {
    page = new ControlTemperaturaFrontPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
