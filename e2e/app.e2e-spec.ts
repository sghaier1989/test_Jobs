import { JsjobsPage } from './app.po';

describe('jsjobs App', function() {
  let page: JsjobsPage;

  beforeEach(() => {
    page = new JsjobsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
