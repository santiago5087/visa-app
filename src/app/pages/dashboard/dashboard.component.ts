import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TramiteService } from '../../services/tramite.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  tramites: any[] = [];

  constructor(private tramiteService: TramiteService,
              private authService: AuthService) {
    this.authService.loadUserCredentials();
    this.tramiteService.getTramites()
      .subscribe((res: any) => {
        this.tramites = res.tramites;
      });
  }

  ngOnInit(): void {
  }

}
