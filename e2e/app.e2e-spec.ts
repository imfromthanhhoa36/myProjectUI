import { myProjectTemplatePage } from './app.po';

describe('myProject App', function() {
  let page: myProjectTemplatePage;

  beforeEach(() => {
    page = new myProjectTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
