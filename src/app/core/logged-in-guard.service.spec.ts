import { TestBed } from "@angular/core/testing";
import { CoreModule } from "./core.module";
import { LoggedInGuard } from "./logged-in-guard.service";
import { LoginService } from "./api/login.service";
import { map } from "rxjs/operators";

fdescribe('LoggedInGuard', () => {
  let service: LoggedInGuard;
  let mockLoginService: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    const stubLoginService = {
      loggedInUser$: {
        pipe: jasmine.createSpy()
      },
    };

    TestBed.configureTestingModule({
      imports: [CoreModule],
      providers: [
        LoggedInGuard,
        { provide: LoginService, useValue: stubLoginService },
      ],
    });

    service = TestBed.get(LoggedInGuard);
    mockLoginService = TestBed.get(LoginService);
  });

  fit('#canActivate should return false if user is not logged in', () => {
    const mockValue = service.canActivate();

    expect(mockLoginService.loggedInUser$.pipe).toHaveBeenCalledTimes(1);
    expect(mockValue).toBeFalsy();
  });

  it('#canActivate should return true if user is logged in', () => {
    //
  });
});