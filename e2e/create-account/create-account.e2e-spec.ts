import { CreateAccountPage } from './create-account.po';
import { ElementFinder, Key } from 'protractor';

fdescribe('create account page', () => {
  let page: CreateAccountPage;

  beforeAll(() => {
    page = new CreateAccountPage();
    page.navigateTo();
  });

  it('should have a name label', () => {
    const element = page.getNameLabel();

    expect(element).toBeTruthy();
    expect(element.getText()).toBe('Name');
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

  describe('name input', () => {
    let nameInput: ElementFinder;

    beforeAll(() => {
      nameInput = page.getNameInput();
    });

    it('should be present', () => {
      expect(nameInput).toBeTruthy();
    });

    it('should have empty value', () => {
      expect(nameInput.getText()).toBe('');
    });

    it('should be text type', () => {
      expect(nameInput.getAttribute('type')).toBe('text');
    });

    it('should have a correct placeholder', () => {
      expect(nameInput.getAttribute('placeholder')).toBe('Enter your name');
    });

    it('should show min length validation message for less than 2 characters', () => {
      nameInput.sendKeys('x');

      const errorMessages = page.getErrorMessages('Name');

      expect(errorMessages.getText()).toBe('Name must have 2 characters at least.');
    });

    it('should show required validation message for dirty empty value', () => {
      nameInput.sendKeys(Key.BACK_SPACE);

      const errorMessages = page.getErrorMessages('Name');

      expect(errorMessages.getText()).toBe('Name is required.');
    });

    it('should show max length validation message for more than 20 characters', () => {
      nameInput.sendKeys('foobarbazfoobarbazfoo');

      const errorMessages = page.getErrorMessages('Name');

      expect(errorMessages.getText()).toBe('Name can have 20 characters at most.');
    });
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

    it('should show max length validation message for more than 100 characters', () => {
      const longEmail = 'foobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbazfoobarbaz@foobarbazfoobarbazfoobarbaz.foobar';

      emailInput.sendKeys(longEmail);

      const errorMessages = page.getErrorMessages('Email');

      expect(errorMessages.getText()).toBe('Email can have 100 characters at most.');
    });
  });

  describe('password input', () => {
    let passwordInput: ElementFinder;

    beforeAll(() => {
      passwordInput = page.getPasswordInput();
    });

    it('should be present', () => {
      expect(passwordInput).toBeTruthy();
    });

    it('should have empty value', () => {
      expect(passwordInput.getText()).toBe('');
    });

    it('should be password type', () => {
      expect(passwordInput.getAttribute('type')).toBe('password');
    });

    it('should have a correct placeholder', () => {
      expect(passwordInput.getAttribute('placeholder')).toBe('Enter your password');
    });

    it('should show min length validation message for less than 8 characters', () => {
      passwordInput.sendKeys('x');

      const errorMessages = page.getErrorMessages('Password');

      expect(errorMessages.getText()).toBe('Password must have 8 characters at least.');
    });

    it('should show required validation message for dirty empty value', () => {
      passwordInput.sendKeys(Key.BACK_SPACE);

      const errorMessages = page.getErrorMessages('Password');

      expect(errorMessages.getText()).toBe('Password is required.');
    });
  });
});
