import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs/observable/of';

import { UserComponent } from './user.component';
import { UsersModule } from '../users.module';
import { User } from '../user.interface';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async(() => {
    const user: User[] = [{ name: 'Foo', email: 'foo@bar.com' }];
    const routeMock = { data: of({ user }) };

    TestBed.configureTestingModule({
      imports: [UsersModule],
      providers: [
        { provide: ActivatedRoute, useValue: routeMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
