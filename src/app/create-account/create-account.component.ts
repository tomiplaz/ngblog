import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {

  @HostBinding('class.form-route-component') isFormRouteComponent = true;

  constructor() { }

}
