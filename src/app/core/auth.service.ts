// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://localhost:3000';

//   constructor(private http: HttpClient) { }

//   login(email: string, password: string): Observable<boolean> {
//     return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
//       map((users) => {
//         const user = users.find(
//           (u: any) => u.email === email && u.password === password
//         );
//         if (user) {
//           localStorage.setItem('currentUser', JSON.stringify(user));
//           return true;
//         }
//         return false;
//       })
//     );
//   }

//   logout(): void {
//     localStorage.removeItem('currentUser');
//   }

//   isLoggedIn(): boolean {
//     return !!localStorage.getItem('currentUser');
//   }

//   register(user: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/users`, user);
//   }
// }


import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map((users) => {
        const user = users.find(
          (u: any) => u.email === email && u.password === password
        );
        if (user) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // Check if the user already exists
  checkUserExists(email: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map(users => users.some(user => user.email === email))
    );
  }

  // Register a new user (only if email doesn't exist)
  register(user: any): Observable<any> {
    return this.checkUserExists(user.email).pipe(
      switchMap(exists => {
        if (exists) {
          return throwError(() => new Error('Email already exists'));
        }
        return this.http.post(`${this.apiUrl}/users`, user);
      })
    );
  }
}
