import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenKey = "JWT-visa";
  userKey = "User-visa"
  isAuthenticated = false;
  userData: Subject<User> = new Subject<User>();
  authToken: string = undefined;
  baseURL = environment.apiURL;

  constructor(private http: HttpClient,
              private router: Router) { }

  checkJWT(): void {
    this.http.get(this.baseURL + 'users/checkToken')
      .subscribe((res: any) => {
        console.log("JWT valido!", res);

        let user: User = {
          email: res.user.email,
          nombre: res.user.nombre,
          apellido: res.user.apellido,
          nacionalidad: res.user.nacionalidad,
          fechaNacimiento: res.user.fechaNacimiento,
          celular: res.user.celular,
          direccion: res.user.direccion,
          codigoPostal: res.user.codigoPostal,
          numeroPasaporte: res.user.numeroPasaporte
        }

        this.sendUserData(user);
      }, err => {
        console.log('JWT error!', err);
        this.destroyUserCredentials();
      });

  }

  sendUserData(user: User): void {
    this.userData.next(user);
  }

  clearUserData(): void {
    this.userData.next(undefined);
  }

  destroyUserCredentials(): void {
    this.isAuthenticated = false;
    this.clearUserData();
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  useCredentials(userData: User, token: string): void {
    this.isAuthenticated = true;
    this.sendUserData(userData);
    this.authToken = token;
  }

  storeUserCredentials(userData: User, token: string): void {
    localStorage.setItem(this.userKey, JSON.stringify(userData));
    localStorage.setItem(this.tokenKey, token);
    this.useCredentials(userData, token);
  }

  loadUserCredentials(): void  {
    const userData: User = JSON.parse(localStorage.getItem(this.userKey));
    const token: string = localStorage.getItem(this.tokenKey);
    console.log('loadUserData', userData);
    if (userData && userData.email) {
      this.useCredentials(userData, token);
      if (this.authToken) {
        this.checkJWT(); // Para verificar si el token aún es válido
      }
    }
  }

  logIn(email: string, password: string): Observable<any> {
    return this.http.post(this.baseURL + 'users/login', { email, password })
      .pipe(map((res: any) => {
        console.log("res logIn", res);
        this.storeUserCredentials({ 
          email: res.user.email,
          nombre: res.user.nombre,
          apellido: res.user.apellido,
          nacionalidad: res.user.nacionalidad,
          fechaNacimiento: res.user.fechaNacimiento,
          celular: res.user.celular,
          direccion: res.user.direccion,
          codigoPostal: res.user.codigoPostal,
          numeroPasaporte: res.user.numeroPasaporte
        }, res.token);

        return { 'success': true }
      }),
      catchError(err => throwError(err.error)));
      /* catchError atrapa un error cuando sucede y retorna otro observable o arroja (throw) un error
      */
  }

  signUp(data: any) {
    return this.http.post(this.baseURL + 'users/signup', data)
      .pipe(catchError(err => throwError(err.error)));
  }

  logOut(): void {
    this.router.navigate(['']);
    this.destroyUserCredentials();
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getToken(): string {
    return this.authToken;
  }

  getUserData() {
    return this.userData.asObservable();
  }

}
