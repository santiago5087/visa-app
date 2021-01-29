import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { User } from '../../models/user';

@Component({
  selector: 'app-visa-form',
  templateUrl: './visa-form.component.html',
  styleUrls: ['./visa-form.component.scss']
})
export class VisaFormComponent {

  tipoVisa: string;
  tipoTramite: string;
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
    password: ''
  }
  tramite = {
    tipoTramite: '',
    tipoVisa: '',
    viajandoPor: '',
    tiempoEstadia: '',
    velocidad: '',
    numeroTramites: '',
    email: ''
  }

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.tipoVisa = params.visa;
      this.tipoTramite = params.tramite
    });
  }

  onSubmit() {
    console.log("UsuarioForm", this.user);
    console.log("VisaForm", this.tramite);
  }

}
