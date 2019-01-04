import { AuthService, Credentials, ResetPassword } from '../app/core/api/auth.service';
import { Observable } from 'rxjs';

export const authServiceStub: Partial<AuthService> = {
  confirmAccount: (token: string) => new Observable(),
  login: (credentials: Credentials) => new Observable(),
  logout: () => {},
  forgotPassword: (email: string) => new Observable(),
  resetPassword: (data: ResetPassword) => new Observable(),
};
