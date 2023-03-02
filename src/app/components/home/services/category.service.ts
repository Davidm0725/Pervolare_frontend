import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  httpHeaders: HttpHeaders;


  constructor(private http: HttpClient) {
    this.httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }


  getCategories(urlService: string): Observable<any> {
    return this.http.get(urlService);
  }

  deleteCategories(urlService: string, data: any): Observable<any> {
    return this.http.delete(urlService, data);
  }

  createCategoty(urlService: string, dataReq: any): Observable<any> {
    return this.http.post(urlService, JSON.stringify(dataReq), { headers: this.httpHeaders });
  }

  updateCategory(urlService: string, dataReq: any): Observable<any> {
    return this.http.put(urlService, JSON.stringify(dataReq), { headers: this.httpHeaders });
  }
}
