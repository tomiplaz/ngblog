import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ConfirmAccountComponent } from 'app/confirm-account/confirm-account/confirm-account.component';
import { MessageService } from 'app/core/message.service';
import { messageServiceStub } from 'tests/message-service.stub';

fdescribe('ConfirmAccountComponent', () => {
  let component: ConfirmAccountComponent;
  let fixture: ComponentFixture<ConfirmAccountComponent>;

  const routerSpy: jasmine.SpyObj<Router> = jasmine.createSpyObj('Router', ['navigate']);

  describe('with successful resolve', () => {
    beforeEach(async(() => {
      const routeStub = { data: of({ }) };

      testBedConfigure(routeStub, routerSpy);
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ConfirmAccountComponent);
      component = fixture.componentInstance;
    });

    it('should create', () => {
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    it('should show success message', () => {
      const confirmAccountSuccessSpy = spyOn(TestBed.get(MessageService), 'confirmAccountSuccess');

      fixture.detectChanges();

      expect(confirmAccountSuccessSpy).toHaveBeenCalledTimes(1);
    });

    it('should navigate to /login route', () => {
      fixture.detectChanges();

      expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
    });
  });

  describe('with unsuccessful resolve', () => {
    const errorMessage = 'foo';

    beforeEach(async(() => {
      const routeStub = { data: throwError(errorMessage) };

      testBedConfigure(routeStub, routerSpy);
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ConfirmAccountComponent);
      component = fixture.componentInstance;
    });

    it('should show error message', () => {
      const errorSpy = spyOn(TestBed.get(MessageService), 'error');

      try {
        fixture.detectChanges();
      } catch (e) {
        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledWith(errorMessage);
      }
    });
  });
});

function testBedConfigure(routeStub, routerSpy) {
  TestBed.configureTestingModule({
    declarations: [ ConfirmAccountComponent ],
    providers: [
      { provide: MessageService, useValue: messageServiceStub },
      { provide: ActivatedRoute, useValue: routeStub },
      { provide: Router, useValue: routerSpy },
    ]
  })
  .compileComponents();
}
