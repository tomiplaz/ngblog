import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @HostBinding('class.form-route-component') isFormRouteComponent = true;

  constructor() { }

}
