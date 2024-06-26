import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../services/budget.service';
import { ModalComponent } from '../modal/modal.component';
import { DatosPersonalesPresupuestoComponent } from '../datos-personales-presupuesto/datos-personales-presupuesto.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, PanelComponent, ModalComponent, DatosPersonalesPresupuestoComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  precioSeo: number = 300;
  precioAds: number = 400;
  precioWeb: number = 500;
  precioTotalHome: number = 0;
  precioParcial: number = 0;
  formularioHome: FormGroup;
  totalCost: number = 0;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.formularioHome = this.fb.group({
      seo: [false],
      ads: [false],
      web: [false]
    });

    this.formularioHome.valueChanges.subscribe(() => {
      this.calcularPrecioParcial();
    })

    this.budgetService.totalCost$.subscribe(cost => {
      this.totalCost = cost;
    });
  }

  private calcularPrecioParcial(): void {
    this.precioParcial = 0;

    if (this.formularioHome.get('seo')?.value) {
      this.precioParcial += this.precioSeo;
    }

    if (this.formularioHome.get('ads')?.value) {
      this.precioParcial += this.precioAds;
    }

    if (this.formularioHome.get('web')?.value) {
      this.precioParcial += this.precioWeb;
    }
    this.precioTotalHome = this.precioParcial;
    this.budgetService.updateHomeCost(this.precioParcial);
  }
  
}



