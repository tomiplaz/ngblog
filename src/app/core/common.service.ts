import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {

  constructor() { }

  trackById(index: number, object: any) {
    return object.id;
  }

}
