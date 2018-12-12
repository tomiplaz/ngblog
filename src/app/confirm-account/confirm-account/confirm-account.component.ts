import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from '../../core/message.service';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.css']
})
export class ConfirmAccountComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.route.data.subscribe(() => {
      this.messageService.confirmAccountSuccess();
    }, response => {
      this.messageService.error(response);
    }, () => {
      this.router.navigate(['/login']);
    });
  }

}
