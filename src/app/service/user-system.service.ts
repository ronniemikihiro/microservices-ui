import { Util } from './../util/util';
import { UserSystem } from '../entities/user-system';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PageUserSystem } from '../entities/paginator/page-user-system';

@Injectable({
  providedIn: 'root'
})
export class UserSystemService {

  url: string = environment.apiURLBase + '/auth/user-system';

  constructor(private http: HttpClient) { }

  list(page, size): Observable<PageUserSystem> {
    const params = new HttpParams().set('page', page).set('size', size);
    return this.http.get<any>(`${this.url}?${params.toString()}`);
  }

  findById(id: number) : Observable<UserSystem> {
    return this.http.get<UserSystem>(`${this.url}/${id}`);
  }
  
  save(userSystem: UserSystem) : Observable<UserSystem> {
    return Util.isEmpty(userSystem.id) ? this.http.post<UserSystem>(this.url, userSystem)
      : this.http.put<UserSystem>(this.url, userSystem);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete<any>(`${this.url}/${id}`);
  }
  
}
