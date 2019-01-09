import { browser, by, element } from 'protractor';

export class LoginPage {
  readonly EMAIL = 'email';
  readonly PASSWORD = 'password';

  navigateTo() {
    return browser.get('/login');
  }

  getEmailLabel() {
    return this.getLabel(this.EMAIL);
  }

  getEmailInput() {
    return this.getInput(this.EMAIL);
  }

  getPasswordLabel() {
    return this.getLabel(this.PASSWORD);
  }

  getPasswordInput() {
    return this.getInput(this.PASSWORD);
  }

  getLabel(forAttr: string) {
    return element(by.css(`label[for="${forAttr}"]`));
  }

  getInput(nameAttr: string) {
    return element(by.css(`input[name="${nameAttr}"]`));
  }
}
