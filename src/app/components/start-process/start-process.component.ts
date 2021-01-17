import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.scss']
})
export class StartProcessComponent implements OnInit {

  empezarTramiteForm: FormGroup;
  verficarEstadoForm: FormGroup;
  tipoTramite = [
    "Turismo (B1/B2)",
    "Negocios (B1/B2)",
    "Estudiante (F y M)",
    "Prensa y Medios (I)",
    "Intercambio académico (J)",
    "Profesiones Religiosas (R1)",
    "Tripulación comercial o Tripulantes de vuelo (C1/D)",
    "Empleo Basado en Petición (H, L, O, P)",
    "Empleadas (os) Domésticas (os) (B-1)",
    "Comerciantes (E-1)",
    "Inversionistas (E-2)",
    "Miembros de Organizaciones Internacionales (G)",
    "Diplomáticos y Empleados, Federales Gobierno Mexicano (A)",
    "NAFTA (TN)",
    "Otro tipo"
  ];
  tipoVisa = [
    "Visa Nueva",
    "Renovar Visa"
  ];

  constructor(private fb: FormBuilder) { }

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
    console.log("Empezar Trámite Form:", this.empezarTramiteForm.value);
  }

  verificarSubmit() {
    console.log("Verificar Estado Form:", this.verficarEstadoForm.value);
  }

}
