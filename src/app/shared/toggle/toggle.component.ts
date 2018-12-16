import { Component, Input } from '@angular/core';
import { IconDefinition, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-toggle',
  templateUrl: './toggle.component.html',
  styleUrls: ['./toggle.component.css']
})
export class ToggleComponent {

  @Input() isUp: boolean;
  @Input() isOpen: boolean;
  @Input() onClick: Function;
  @Input() isDisabled = false;

  faChevronDown: IconDefinition = faChevronDown;
  faChevronUp: IconDefinition = faChevronUp;

  constructor() { }

}
