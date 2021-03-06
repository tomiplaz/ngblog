import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent {

  @Input() name: string;
  @Input() control: FormControl;
  @Input() group: FormGroup;
  @Input() passwordControlName: string;
  @Input() confirmPasswordControlName: string;

  constructor() { }

}
