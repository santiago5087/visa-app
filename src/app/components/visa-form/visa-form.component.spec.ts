import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaFormComponent } from './visa-form.component';

describe('VisaFormComponent', () => {
  let component: VisaFormComponent;
  let fixture: ComponentFixture<VisaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
