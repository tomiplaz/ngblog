import { LoginPage } from './login.po';
import { ElementFinder, Key } from 'protractor';

fdescribe('login page', () => {
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

  it('should have a password label', () => {
    const element = page.getPasswordLabel();

    expect(element).toBeTruthy();
    expect(element.getText()).toBe('Password');
  });

  describe('email input', () => {
    let emailInput: ElementFinder;

    beforeAll(() => {
      emailInput = page.getEmailInput();
    });

    it('should be present', () => {
      expect(emailInput).toBeTruthy();
    });

    it('should have empty value', () => {
      expect(emailInput.getText()).toBe('');
    });

    it('should be email type', () => {
      expect(emailInput.getAttribute('type')).toBe('email');
    });

    it('should have a correct placeholder', () => {
      expect(emailInput.getAttribute('placeholder')).toBe('Enter your email');
    });

    it('should show email validation message for non-empty non-email value', () => {
      emailInput.sendKeys('foo');

      const errorMessages = page.getErrorMessages('Email');

      expect(errorMessages.getText()).toBe('Email must be a valid email.');
    });

    it('should show required validation message for dirty empty value', () => {
      emailInput.sendKeys(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE);

      const errorMessages = page.getErrorMessages('Email');

      expect(errorMessages.getText()).toBe('Email is required.');
    });
  });

  it('should have a password input', () => {
    const element = page.getPasswordInput();

    expect(element).toBeTruthy();
    expect(element.getText()).toBe('');
    expect(element.getAttribute('type')).toBe('password');
    expect(element.getAttribute('placeholder')).toBe('Enter your password');
  });
});
