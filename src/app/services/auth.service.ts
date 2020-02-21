import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import * as jwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
  base_URL = 'http://localhost:4201/auth';

  constructor(private http:Http) { }

  login(criterials)
  {
      return this.http.post(this.base_URL + '/login', criterials)
          .map(res => res.json());
  }

  userIsLoggedIn() {
        return !!localStorage.getItem('jbb-data');
    }

  logOut() {
        localStorage.removeItem('jbb-data');
    }

  register(criterials)
  {
    console.log("formData",criterials);
    return this.http.post(this.base_URL + '/register', criterials)
        .map(res => res.json());
  }

  decodeToken(token)
  {
    return jwtDecode(token);

  }

}
