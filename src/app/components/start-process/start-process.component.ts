import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { listaTipoTramites, listaTipoVisa } from '../../shared/data';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.scss']
})
export class StartProcessComponent implements OnInit {

  empezarTramiteForm: FormGroup;
  verficarEstadoForm: FormGroup;
  tipoTramite = listaTipoTramites;
  tipoVisa = listaTipoVisa;

  constructor(private fb: FormBuilder,
              private route: Router) { }

  ngOnInit(): void {
    this.createForms();
  }

  createForms(): void {
    this.empezarTramiteForm = this.fb.group({
      tipoTramite: ['Turismo (B1/B2)', Validators.required],
      tipoVisa: ['Visa Nueva', Validators.required],
    });

    this.verficarEstadoForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required]
    });
  }

  empezarSubmit() {
    console.log("Empezar Trámite Form:", this.empezarTramiteForm);
    const { tipoTramite, tipoVisa } = this.empezarTramiteForm.value;
    this.route.navigate(['/registro', tipoTramite, tipoVisa]);
  }

  verificarSubmit() {
    console.log("Verificar Estado Form:", this.verficarEstadoForm.value);
  }

}
