import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatosPersonalesPresupuestoComponent } from './datos-personales-presupuesto.component';

describe('DatosPersonalesPresupuestoComponent', () => {
  let component: DatosPersonalesPresupuestoComponent;
  let fixture: ComponentFixture<DatosPersonalesPresupuestoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DatosPersonalesPresupuestoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DatosPersonalesPresupuestoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
