import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  user = {
    email: '',
    password: ''
  }

  constructor(private authService: AuthService,
              private router: Router) { }

  login() {
    this.authService.logIn(this.user.email, this.user.password)
      .subscribe(res => {
        if(res.success) {
          Swal.fire({
            icon: 'success',
            title: 'Ha iniciado sesión con éxito',
            timer: 1500
          });
          this.router.navigateByUrl('/dashboard');
        } else console.log(res);
      }, err => {
        Swal.fire({
          icon: 'error',
          title: err.err.msg,
          text: 'Por favor inténtalo de nuevo'
        });
      });
  }

}
