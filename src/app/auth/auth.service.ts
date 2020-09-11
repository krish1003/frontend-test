import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../model/user';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient,private router:Router) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
      return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
      return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { email, password })
          .pipe(map(user => {
              // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
              user.authdata = window.btoa(email + ':' + password);
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
          }));
  }

  logout() {
      // remove user from local storage to log user out
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
  }

  // public login(userInfo: User){
  //   localStorage.setItem('ACCESS_TOKEN', "demoaccesstoken");
  // }

  // public isLoggedIn(){
  //   return localStorage.getItem('ACCESS_TOKEN') !== null;

  // }

  // public logout(){
  //   localStorage.removeItem('ACCESS_TOKEN');
  // }
}