import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { listaTipoTramites, listaTipoVisa } from '../../shared/data';
import { AuthService } from '../../services/auth.service';
import { TramiteService } from '../../services/tramite.service';
import { UsersService } from '../../services/users.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tramites: any[] = [];
  misTramitesTemp = true;
  misDatosTemp = false;
  nuevoTramiteTemp = false;
  tipoTramite = listaTipoTramites;
  tipoVisa = listaTipoVisa;
  tramite = {
    tipoTramite: 'Turismo (B1/B2)',
    tipoVisa: 'Visa Nueva',
    viajandoPor: 'Aire',
    tiempoEstadia: 'Menos de 90 días en EE.UU',
    velocidad: 'Trámite Normal',
    numeroTramites: '1 Trámite (Yo solo)'
  }
  user: User;

  constructor(private tramiteService: TramiteService,
              private authService: AuthService,
              private userService: UsersService) {
    this.authService.loadUserCredentials();
    this.tramiteService.getTramites()
      .subscribe((res: any) => {
        this.tramites = res.tramites;
      });
    this.authService.getUserData()
      .subscribe((user: User) => {
        this.user = user;
      });
  }

  ngOnInit(): void {
  }

  changeTemplate(id: number) {
    if(id == 1) {
      this.misTramitesTemp = true;
      this.misDatosTemp = false;
      this.nuevoTramiteTemp = false;
    } else if(id == 2) {
      this.misTramitesTemp = false;
      this.misDatosTemp = true;
      this.nuevoTramiteTemp = false;
      console.log("Datos Usuario", this.user);
    } else {
      this.misTramitesTemp = false;
      this.misDatosTemp = false;
      this.nuevoTramiteTemp = true;
    }
  }

  actualizarUsuario() {
    this.userService.updateProfile(this.user)
      .subscribe((res: any) => {
        Swal.fire({
          icon: 'success',
          title: res.msg,
          timer: 1500
        });
      });
  }

  crearTramite() {
    this.tramiteService.createTramite(this.tramite)
      .subscribe((res: any) => {
        console.log("Tramite creado:", res);
        Swal.fire({
          icon: 'success',
          title: 'Támite creado exitosamente',
          timer: 1500
        });
        this.tramites.push(res.tramite);
        // this.router.navigateByUrl('/dashboard');
      });
  }

}
