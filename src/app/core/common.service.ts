import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class CommonService {

  constructor() { }

  trackById(index: number, object: any) {
    return object.id;
  }

  getPasswordMatchValidator(passwordControlName: string, confirmPasswordControlName: string) {
    return (formGroup: FormGroup) => {
      const passwordValue = formGroup.get(passwordControlName).value;
      const confirmPasswordValue = formGroup.get(confirmPasswordControlName).value;

      return passwordValue !== confirmPasswordValue ? { passwordMatch: true } : null;
    };
  }

}
