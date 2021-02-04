import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-visa-form',
  templateUrl: './visa-form.component.html',
  styleUrls: ['./visa-form.component.scss']
})
export class VisaFormComponent {

  user = {
    email: '',
    nombre: '',
    apellido: '',
    nacionalidad: '',
    fechaNacimiento: '',
    celular: '',
    direccion: '',
    codigoPostal: '',
    numeroPasaporte: '',
    password: '',
    password2: ''
  }
  tramite = {
    tipoTramite: '',
    tipoVisa: '',
    viajandoPor: '',
    tiempoEstadia: '',
    velocidad: '',
    numeroTramites: ''
  }

  constructor(private activatedRoute: ActivatedRoute,
              private authService: AuthService,
              private tramiteService: TramiteService,
              private router: Router) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.tramite.tipoVisa = params.visa;
      this.tramite.tipoTramite = params.tramite;
    });
  }

  onSubmit(form: NgForm) {
    console.log("formulario", form);
    console.log("UsuarioForm", this.user);
    console.log("VisaForm", this.tramite);

    if(form.valid) {
      this.authService.signUp(this.user)
        .subscribe((res: any) => {
          if(res.success) {
            console.log("Usuario registrado");
            // this.tramite.email = this.user.email;
  
            this.authService.logIn(this.user.email, this.user.password)
              .subscribe(res => {
                if(res.success) {
                  // Crear trámite
                  this.tramiteService.createTramite(this.tramite)
                    .subscribe(res => {
                      console.log("Tramite creado:", res);
                      Swal.fire({
                        icon: 'success',
                        title: 'Registro y trámite creados exitosamente',
                        timer: 1500
                      });
                      this.router.navigateByUrl('/dashboard');
                    });
                }
              });
          }
        }, err => {
          console.log("ERROR", err);
          Swal.fire({
            icon: 'error',
            title: err.msg,
            // text: 'Por favor inténtalo de nuevo'
          });
        })
    } else {
      if ( form.invalid ) {

        Object.values( form.controls ).forEach( control => {
          control.markAsTouched();
        });

        return;
      }
    }

  }

}
