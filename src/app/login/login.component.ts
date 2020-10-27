import { RequiredFieldError } from '../error/required-field-error';
import { Util } from 'src/app/util/util';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../security/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;
  password: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  validateRequiredFields(): void {
    if(Util.isEmpty(this.email)) {
      throw new RequiredFieldError('Email');
    } else if(Util.isEmpty(this.password)) {
      throw new RequiredFieldError('Password');
    }
  }

  login() {
    try {
      this.validateRequiredFields();

      this.authService.login(this.email, this.password).subscribe(response => {
        this.authService.saveToken(response);
        this.toastr.success('Login successfully!');
        this.router.navigate(['/home']);
      }, errorResponse => {
        console.log(errorResponse);
        this.toastr.error(errorResponse.error.error === 'invalid_grant' ? 
          'Invalid username or password!' : errorResponse.error.message);
      })
    } catch (e) {
      if(e instanceof RequiredFieldError) {
        this.toastr.warning(e.message);
      }
    }
  }
}
