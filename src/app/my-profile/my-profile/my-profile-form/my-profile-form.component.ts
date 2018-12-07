import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MessageService } from '../../../core/message.service';
import { UsersService } from '../../../core/api/users.service';
import { AppState } from '../../../core/store/store';
import { selectUser } from '../../../core/store/auth/auth.selectors';
import { User, UpdateUser } from '../../../users/user.interface';
import { SetUser } from '../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-my-profile-form',
  templateUrl: './my-profile-form.component.html',
  styleUrls: [
    '../../../shared/shared.css',
    './my-profile-form.component.css',
  ]
})
export class MyProfileFormComponent implements OnInit {

  myProfileForm: FormGroup;

  private userId: number;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private usersService: UsersService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.store.pipe(select(selectUser)).subscribe((user: User) => {
      this.buildForm(user);
      this.userId = user.id;
    }).unsubscribe();
  }

  onSubmit() {
    const data: UpdateUser = {
      website: this.myProfileForm.controls.website.value,
      about: this.myProfileForm.controls.about.value,
    };

    this.usersService.updateUser(this.userId, data).subscribe((user: User) => {
      this.messageService.updateMyProfileSuccess();
      this.store.dispatch(new SetUser(user));
    }, response => {
      this.messageService.error(response);
    });
  }

  private buildForm(user: User) {
    this.myProfileForm = this.formBuilder.group({
      name: [{ value: user.name, disabled: true }],
      email: [{ value: user.email, disabled: true }],
      website: [user.website, [Validators.maxLength(255)]],
      about: [user.about, [Validators.maxLength(1000)]],
    });
  }

}