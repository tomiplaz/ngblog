import { LoginPage } from './login.po';

describe('login page', () => {
  let page: LoginPage;

  beforeAll(() => {
    page = new LoginPage();
    page.navigateTo();
  });

  it('should have an email label', () => {
    const element = page.getEmailLabel();

    expect(element).toBeTruthy();
    expect(element.getText()).toBe('Email');
  });

  it('should have an email input', () => {
    const element = page.getEmailInput();

    expect(element).toBeTruthy();
    expect(element.getText()).toBe('');
    expect(element.getAttribute('type')).toBe('email');
    expect(element.getAttribute('placeholder')).toBe('Enter your email');
  });

  it('should have a password label', () => {
    const element = page.getPasswordLabel();

    expect(element).toBeTruthy();
    expect(element.getText()).toBe('Password');
  });

  it('should have a password input', () => {
    const element = page.getPasswordInput();

    expect(element).toBeTruthy();
    expect(element.getText()).toBe('');
    expect(element.getAttribute('type')).toBe('password');
    expect(element.getAttribute('placeholder')).toBe('Enter your password');
  });
});