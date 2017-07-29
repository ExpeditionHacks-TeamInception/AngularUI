import { MobilityPage } from './app.po';

describe('mobility App', () => {
  let page: MobilityPage;

  beforeEach(() => {
    page = new MobilityPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
