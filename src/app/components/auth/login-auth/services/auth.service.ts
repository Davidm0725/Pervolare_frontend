import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const urlBase = environment.URL_BASE;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }


  auth(service: string, data: any): Observable<any> {
    return this.http.get(service, data);
  }

  isLogged(resp: boolean) {
    localStorage.setItem('isLogged', resp == true ? 'OK' : 'NOT');
  }
}
