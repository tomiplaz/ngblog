import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  order = new FormControl('desc');

  constructor() { }

  ngOnInit() {
    this.order.valueChanges.subscribe(value => {
      //
    });
  }

}
