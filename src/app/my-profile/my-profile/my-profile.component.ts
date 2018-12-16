import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent {

  @HostBinding('class.form-route-component') isFormRouteComponent = true;

  constructor() { }

}
