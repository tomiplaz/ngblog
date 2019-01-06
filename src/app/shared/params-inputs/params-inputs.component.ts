import { Component, Input, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-params-inputs',
  templateUrl: './params-inputs.component.html',
  styleUrls: ['./params-inputs.component.css']
})
export class ParamsInputsComponent implements OnInit {

  readonly SORT_OPTIONS_REQUIRED = 'ParamsInputsComponent requires sortOptions attribute!';

  @Input() sortOptions: { value: string, text: string }[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    if (!this.sortOptions) {
      throw new Error(this.SORT_OPTIONS_REQUIRED);
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
