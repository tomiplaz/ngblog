import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {

  @HostBinding('class.form-route-component') isFormRouteComponent = true;

  constructor() { }

}
