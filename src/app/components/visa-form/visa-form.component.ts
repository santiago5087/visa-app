import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-visa-form',
  templateUrl: './visa-form.component.html',
  styleUrls: ['./visa-form.component.scss']
})
export class VisaFormComponent implements OnInit {

  visa: string;
  tramite: string;

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.visa = params.visa;
      this.tramite = params.tramite
    });
  }

  ngOnInit(): void {
  }

}
