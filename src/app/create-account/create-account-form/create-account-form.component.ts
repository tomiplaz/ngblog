import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UsersService } from '../../core/api/users.service';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.css']
})
export class CreateAccountFormComponent {

  createAccountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {
    this.createForm();
  }

  createForm() {
    this.createAccountForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    this.usersService.createUser(this.createAccountForm.value)
      .subscribe(response => {
        // Account created successfully.
      }, response => {
        // Something went wrong.
      });
  }

}
