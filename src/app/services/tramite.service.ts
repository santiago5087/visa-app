import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TramiteService {

  baseURL = environment.apiURL;

  constructor(private http: HttpClient) { }

  getTramites() {
    return this.http.get(this.baseURL + 'tramites')
  }

  createTramite(tramite: any) {
    return this.http.post(this.baseURL + 'tramites', tramite)
  }

}
