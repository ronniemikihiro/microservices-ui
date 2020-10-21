import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './../entity/usuario';
import { AuthService } from '../security/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  username: string;
  email: string;
  password: string;
  cadastrando: boolean;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private toastr: ToastrService
  ) {}

  login() {
    this.authService
      .login(this.email, this.password)
      .subscribe(response => {
        const token = response.body.token;
        localStorage.setItem('access_token', token)
        this.toastr.success('Login efetuado com sucesso!');
        /*this.router.navigate(['/home'])*/
      }, errorResponse => {
        console.log(errorResponse);
        const trace = errorResponse.error.trace;
        this.toastr.error(trace);
      })
  }

  /*cadastrar(){
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.email = this.email;
    usuario.password = this.password;
    this.authService
        .salvar(usuario)
        .subscribe( response => {
            this.mensagemSucesso = "Cadastro realizado com sucesso! Efetue o login.";
            this.cadastrando = false;
            this.username = '';
            this.email = '';
            this.password = '';
            this.errors = []
        }, errorResponse => {
            this.mensagemSucesso = null;
            this.errors = errorResponse.error.errors;
        })
  }*/

}
