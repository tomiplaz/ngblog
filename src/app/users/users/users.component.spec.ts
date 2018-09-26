import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { UsersComponent } from './users.component';
import { UsersModule } from '../users.module';
import { User } from '../user.interface';
import { AppRoutingModule } from '../../app-routing.module';
import { CoreModule } from '../../core/core.module';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    const users: User[] = [{ name: 'Foo', email: 'foo@bar.com' }];
    const routeMock = { data: of(users) };

    TestBed.configureTestingModule({
      imports: [UsersModule, AppRoutingModule, CoreModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
