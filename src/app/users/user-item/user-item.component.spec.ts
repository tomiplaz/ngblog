import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { UserItemComponent } from './user-item.component';
import { SharedModule } from 'app/shared/shared.module';
import { User } from '../user.interface';

describe('UserItemComponent', () => {
  let component: UserItemComponent;
  let fixture: ComponentFixture<UserItemComponent>;
  let router: Router;

  beforeEach(async(() => {
    const routerStub = {
      navigate: () => {},
    };

    TestBed.configureTestingModule({
      imports: [ RouterModule, SharedModule ],
      declarations: [ UserItemComponent ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: {} },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserItemComponent);
    component = fixture.componentInstance;
  });

  describe('with no user input provided', () => {
    it('should throw error', () => {
      try {
        fixture.detectChanges();
      } catch (e) {
        expect(e.message).toBe(component.USER_REQUIRED);
      }
    });
  });

  describe('with user input provided', () => {
    const user: User = { name: 'foo', email: 'foo@foo.foo'};

    beforeEach(() => {
      component.user = user;
    });

    it('should create', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    describe('#onNameClick', () => {
      let navigateSpy: jasmine.Spy;

      beforeEach(() => {
        router = TestBed.get(Router);
        navigateSpy = spyOn(router, 'navigate');
      });

      function insideEach(isPreview: boolean) {
        fixture.detectChanges();
        component.isPreview = isPreview;
        component.onNameClick();
      }

      it('shouldn\'t navigate if it isn\'t preview', () => {
        insideEach(false);

        expect(navigateSpy).not.toHaveBeenCalled();
      });

      it('should navigate to user route if it is preview', () => {
        insideEach(true);

        expect(navigateSpy).toHaveBeenCalledTimes(1);
        expect(navigateSpy).toHaveBeenCalledWith(['/users', user.name]);
      });
    });
  });
});
