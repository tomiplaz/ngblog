import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UsersService } from '../core/api/users.service';
import { User } from './user.interface';
import { PaginatedResponse } from '../shared/paginator/paginated-response.interface';

@Injectable()
export class UsersResolverService implements Resolve<PaginatedResponse<User>> {

  constructor(private usersService: UsersService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<PaginatedResponse<User>> {
    return this.usersService.getUsers(route.queryParams);
  }

}
