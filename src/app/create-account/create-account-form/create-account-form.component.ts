import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsersService } from '../../core/api/users.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-account-form',
  templateUrl: './create-account-form.component.html',
  styleUrls: ['./create-account-form.component.css']
})
export class CreateAccountFormComponent implements OnInit {

  createAccountForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private toastrService: ToastrService
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
        this.router.navigate(['/login']);
        this.toastrService.success('Account created. Please log in.');
      }, response => {
        if (response.status === 400) {
          let errors = response.error.response.original;
          for (let type in errors) {
            errors[type].forEach(message => {
              this.toastrService.error(message);
            });
          }
        } else {
          this.toastrService.error('Something went wrong.');
        }
        this.createAccountForm.reset();
      });
  }

}
