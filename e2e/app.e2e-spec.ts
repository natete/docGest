import { DocGestPage } from './app.po';

describe('doc-gest App', function() {
  let page: DocGestPage;

  beforeEach(() => {
    page = new DocGestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
