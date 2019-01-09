import { AppPage } from './app.po';

describe('app page', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app title', () => {
    page.navigateTo();
    expect(page.getTitle()).toEqual('blogs');
  });
});
