import { Component, Input, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-params-inputs',
  templateUrl: './params-inputs.component.html',
  styleUrls: ['./params-inputs.component.css']
})
export class ParamsInputsComponent implements OnInit {

  @Input() sortOptions: { value: string, text: string }[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (!this.sortOptions) {
      throw new Error('ParamsInputsComponent requires sortOptions attribute!');
    }
  }

  onParamChanged(param: Params) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { ...param },
      queryParamsHandling: 'merge',
    });
  }

}
