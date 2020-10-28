import { Router } from '@angular/router';
import { AuthService } from '../../../security/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  userAuthenticated: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userAuthenticated = this.authService.getUsuarioAuthenticated();
  }

  logout() {
    this.authService.deleteToken();
    this.router.navigate(['/login']);
  }

}
