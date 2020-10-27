import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly ACCESS_TOKEN = 'ACCESS_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';

  jwtPayload: any;
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) { }

  getToken() {
    return localStorage.getItem(this.ACCESS_TOKEN);
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN);
  }

  saveToken(response: any) {
    this.deleteToken();
    this.jwtPayload = this.jwtHelper.decodeToken(response.access_token);
    localStorage.setItem(this.ACCESS_TOKEN, response.access_token);
    localStorage.setItem(this.REFRESH_TOKEN, response.refresh_token);
  }

  deleteToken() {
    localStorage.removeItem(this.ACCESS_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
    this.jwtPayload = null;
  }

  isTokenExpired(): boolean {
    const access_token = this.getToken();
    return !access_token || this.jwtHelper.isTokenExpired(access_token);
  }

  isAuthenticated() : boolean {
    return !this.isTokenExpired();
  }

  getUsuarioAuthenticated(){
    const access_token = this.getToken();
    return access_token ? this.jwtHelper.decodeToken(access_token).user_name : null;
  }

  hasRole(roles: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(roles);
  }

  hasAnyRole(roles: Array<string>) {
    return roles.find(role => this.hasRole(role)) !== undefined ? true : false;
  }

  login(email: string, password: string): Observable<any> {
    const params = new HttpParams()
          .set('username', email)
          .set('password', password)
          .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    return this.http.post(this.tokenURL, params.toString(), { headers });
  }

  refreshToken(): Observable<any> {
    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', this.getRefreshToken());

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }

    return this.http.post(this.tokenURL, params.toString(), { headers });
  }
}
