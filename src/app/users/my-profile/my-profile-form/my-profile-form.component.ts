import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { MessageService } from '../../../core/message.service';
import { UsersService } from '../../../core/api/users.service';
import { AppState } from '../../../core/store/store';
import { selectUser } from '../../../core/store/auth/auth.selectors';
import { User } from '../../user.interface';

@Component({
  selector: 'app-my-profile-form',
  templateUrl: './my-profile-form.component.html',
  styleUrls: ['./my-profile-form.component.css']
})
export class MyProfileFormComponent implements OnInit {

  myProfileForm: FormGroup;

  private readonly websiteRegex: RegExp = new RegExp(/[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/, 'gi');

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<AppState>,
    private usersService: UsersService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.store.pipe(select(selectUser)).subscribe((user: User) => {
      this.buildForm(user);
    });
  }

  onSubmit() {
    this.usersService.updateUser(this.myProfileForm.value).subscribe(() => {
      this.messageService.updateMyProfileSuccess();
    }, response => {
      this.messageService.error(response);
    });
  }

  private buildForm(user: User) {
    this.myProfileForm = this.formBuilder.group({
      name: [user.name, [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
      email: [user.email, [Validators.required, Validators.email, Validators.maxLength(100)]],
      about: [user.about, [Validators.maxLength(1000)]],
      website: [user.website, [Validators.pattern(this.websiteRegex), Validators.maxLength(255)]],
    });
  }

}
