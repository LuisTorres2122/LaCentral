import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';

import { Router } from '@angular/router';
import { UserService } from 'src/app/erp/services/user.service';
import { tokenUser } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private urlapi: string = environment.apiurl + '/User';
  private readonly token = 'token';

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {}

  login(user: tokenUser): Observable<boolean> {
    return this.userService.login(user).pipe(
      map((res) => {
        console.log(`Bienvenido ${user.email}`);
        this.setToken(res.token);
        this.router.navigate(['/erp']);
        return true;
      }),
      catchError(() => of(false))
    );
  }

  isLoggedIn(): Observable<boolean> {
    const token = this.Token;
    return of(!!token); 
  }

  logOut():void{
    this.setToken("");
    this.router.navigate(['lacentral/inicio']);
  }


  get Token() {
    return localStorage.getItem(this.token);
  }

  public setToken(token: string) {
    localStorage.setItem(this.token, token);
  }
}
