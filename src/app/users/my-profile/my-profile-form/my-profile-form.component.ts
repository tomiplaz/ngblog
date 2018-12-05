import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessageService } from '../../../core/message.service';
import { UsersService } from '../../../core/api/users.service';

@Component({
  selector: 'app-my-profile-form',
  templateUrl: './my-profile-form.component.html',
  styleUrls: ['./my-profile-form.component.css']
})
export class MyProfileFormComponent implements OnInit {

  myProfileForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.myProfileForm = this.formBuilder.group({
      name: [],
      email: [],
      about: [],
      website: [],
    });
  }

  onSubmit() {
    this.usersService.updateUser(this.myProfileForm.value).subscribe(() => {
      this.messageService.updateMyProfileSuccess();
    }, response => {
      this.messageService.error(response);
    });
  }

}
