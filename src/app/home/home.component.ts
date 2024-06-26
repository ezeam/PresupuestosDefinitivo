import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { PanelComponent } from '../panel/panel.component';
import { BudgetService } from '../services/budget.service';
import { ModalComponent } from '../modal/modal.component';
import { DatosPersonalesPresupuestoComponent } from '../datos-personales-presupuesto/datos-personales-presupuesto.component';
import { Presupuesto } from '../interfaces/presupuesto';

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
  listaPresupuestos: Presupuesto[] = [];
  selectedServices: string[] = []; 

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.formularioHome = this.fb.group({
      seo: [false],
      ads: [false],
      web: [false]
    });

    this.formularioHome.valueChanges.subscribe(() => {
      this.calcularPrecioParcial();
      this.budgetService.updateServiciosSeleccionados(this.selectedServices);
    })

    this.budgetService.totalCost$.subscribe(cost => {
      this.totalCost = cost;
    });

    this.budgetService.getPresupuestos().subscribe((presupuestos: Presupuesto[]) => {
      this.listaPresupuestos = presupuestos;
    });
  }

  addPresupuesto(presupuesto: Presupuesto): void {
    this.budgetService.addPresupuesto(presupuesto);
  }

  private calcularPrecioParcial(): void {
    this.precioParcial = 0;
    this.selectedServices = []; 

    if (this.formularioHome.get('seo')?.value) {
      this.precioParcial += this.precioSeo;
      this.selectedServices.push('SEO');
    }

    if (this.formularioHome.get('ads')?.value) {
      this.precioParcial += this.precioAds;
      this.selectedServices.push('Ads');
    }

    if (this.formularioHome.get('web')?.value) {
      this.precioParcial += this.precioWeb;
      this.selectedServices.push('Web');
    }

    this.precioTotalHome = this.precioParcial;
    this.budgetService.updateHomeCost(this.precioParcial);
    
    console.log("Servicios añadidos: ", this.selectedServices);
  }

  submitFormDatosPresupuesto() {
    let nombreInput = <HTMLInputElement>document.getElementById("nombrePresupuesto");
    let tlfInput = <HTMLInputElement>document.getElementById("tlfPresupuesto");
    let emailInput = <HTMLInputElement>document.getElementById("emailPresupuesto");

    this.crearPresupuesto(nombreInput.value, +(tlfInput.value), emailInput.value);
    
  }

  crearPresupuesto(nombre: string, telefono: number, email: string): void {
    const presupuestoGuardar: Presupuesto = {
      nombre: nombre,
      telefono: telefono,
      email: email,
      fecha: new Date(),
      total: this.budgetService.calculateTotalCost(),
      servicios: this.selectedServices // Añadir los servicios seleccionados
    };

    this.listaPresupuestos.push(presupuestoGuardar);
    this.budgetService.addPresupuesto(presupuestoGuardar);
    console.log("Presupuesto creado: ", presupuestoGuardar);
    console.table(this.listaPresupuestos);
  }

  
}
