import { browser, by, element } from 'protractor';

export class CreateAccountPage {
  readonly NAME = 'name';
  readonly EMAIL = 'email';
  readonly PASSWORD = 'password';

  navigateTo() {
    return browser.get('/create-account');
  }

  getNameLabel() {
    return this.getLabel(this.NAME);
  }

  getNameInput() {
    return this.getInput(this.NAME);
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

  getErrorMessages(nameAttr: string) {
    return element(by.css(`app-error-messages[ng-reflect-name="${nameAttr}"] p`));
  }
}
