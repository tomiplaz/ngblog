import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../core/api/users.service';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: [
    '../../shared/shared.css',
    './create-account-form.component.css',
  ]
})
export class CreateAccountFormComponent implements OnInit {

  createAccountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.createAccountForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email, Validators.maxLength(100)]],
      password: [null, Validators.required]
    });
  }

  onSubmit() {
    this.usersService.createUser(this.createAccountForm.value)
      .subscribe(response => {
        this.messageService.createAccountSuccess();
        this.router.navigate(['login']);
      }, response => {
        this.messageService.error(response);
      });
  }

}
