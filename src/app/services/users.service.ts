import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  baseURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  updateProfile(profile: any) {
    return this.http.put<any>(this.baseURL + 'users/updateProfile', profile);
  }

}
