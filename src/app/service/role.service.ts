import { Role } from './../user-system/role';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url: string = environment.apiURLBase + '/auth/role';

  constructor(private http: HttpClient) { }

  list(): Observable<Role[]> {
    return this.http.get<any>(this.url);
  }
  
}
