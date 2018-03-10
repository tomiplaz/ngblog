import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';

const JWT_KEY = 'blogeo-jwt';

@Injectable()
export class JwtService {

  constructor() { }

  setJWT(token: string): void {
    localStorage.setItem(JWT_KEY, token);
  }

  getJWT(): string | null {
    return localStorage.getItem(JWT_KEY);
  }

  removeJWT(): void {
    localStorage.removeItem(JWT_KEY);
  }

  decodeJWT(token: string): any {
    return JWT(token);
  }

}
