import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../services/budget.service';
import { PanelComponent } from '../panel/panel.component';
import { Presupuesto } from '../interfaces/presupuesto';

@Component({
  selector: 'app-datos-personales-presupuesto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,PanelComponent],
  templateUrl: './datos-personales-presupuesto.component.html',
  styleUrl: './datos-personales-presupuesto.component.css'
})
export class DatosPersonalesPresupuestoComponent {
  formularioDatosPersonales: FormGroup;
  listaPresupuestos: Presupuesto[] = [];

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.formularioDatosPersonales = this.fb.group({
      nombre: "",
      telefono: 0,
      email: ""
    });
    this.budgetService.getPresupuestos().subscribe((presupuestos: Presupuesto[]) => {
      this.listaPresupuestos = presupuestos;
    });
  }

  validacionFormularioDatosPersonales(){
    let nombrePresupuesto = document.getElementById("nombrePresupuesto") as HTMLInputElement;
    let tlfPresupuesto = document.getElementById("tlfPresupuesto") as HTMLInputElement;
    let emailPresupuesto = document.getElementById("emailPresupuesto") as HTMLInputElement;
    //const fechaHoy:string = new Date().toISOString().split('T')[0];
  
    let todoBienNombre: boolean = false;
    let todoBienTlf: boolean = false;
    let todoBienEmail: boolean = false;
  
    const errorNombre = document.getElementById("error-nombre");
    const errorTelefono = document.getElementById("error-tlf");
    const errorEmail = document.getElementById("error-email");

    if (!nombrePresupuesto.value) {       
      nombrePresupuesto.classList.add("is-invalid");
      if(errorNombre) errorNombre.innerHTML = `No puede haber campos vacíos`;
    }else if(!this.soloTieneLetras(nombrePresupuesto.value)){
      console.log("¿Entras?");
      nombrePresupuesto.classList.add("is-invalid");
      if(errorNombre) errorNombre.innerHTML = `El campo nombre sólo puede contener letras`;
    }
    else {
      nombrePresupuesto.classList.remove("is-invalid");
      if(errorNombre) errorNombre.innerHTML = '';
      todoBienNombre = true;
    };
    if (!tlfPresupuesto.value) {       
      tlfPresupuesto.classList.add("is-invalid");
      if(errorTelefono) errorTelefono.innerHTML = `No puede haber campos vacíos`;
    }
    else if (+(tlfPresupuesto.value) <= 0) {  
      tlfPresupuesto.classList.add("is-invalid");
      if(errorTelefono) errorTelefono.innerHTML = `El valor ha de ser superior a 0`;
    }
    else {
      tlfPresupuesto.classList.remove("is-invalid");
      if(errorTelefono) errorTelefono.innerHTML = '';
      todoBienTlf = true;
    };
    if (!emailPresupuesto.value) {       
      emailPresupuesto.classList.add("is-invalid");
      if(errorEmail) errorEmail.innerHTML = `No puede haber campos vacíos`;
    }else if(!this.emailCorrecto(emailPresupuesto.value)){
      emailPresupuesto.classList.add("is-invalid");
      if(errorEmail) errorEmail.innerHTML = `El campo email no tiene la estructura correcta`;
    }
    else {
      emailPresupuesto.classList.remove("is-invalid");
      if(errorEmail) errorEmail.innerHTML = '';
      todoBienEmail = true;
    };

    return (todoBienNombre && todoBienTlf && todoBienEmail);
  }

  soloTieneLetras(campo: string) {
    const regularExpression = new RegExp(/^[A-Za-z]+$/);
    return regularExpression.test(campo);
  }

  emailCorrecto(campo: string) {
    const regularExpression = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    return regularExpression.test(campo);
  }

  submitFormDatosPresupuesto(){
    let nombreInput = <HTMLInputElement>document.getElementById("nombrePresupuesto");
    let tlfInput = <HTMLInputElement>document.getElementById("tlfPresupuesto");
    let emailInput = <HTMLInputElement>document.getElementById("emailPresupuesto");
    
    if(this.validacionFormularioDatosPersonales()) {
     this.crearPresupuesto(nombreInput.value, +(tlfInput.value), emailInput.value)
          }
  }

  crearPresupuesto(nombre: string, telefono: number, email: string): void {
    const presupuestoGuardar: Presupuesto = {
        nombre: nombre,
        telefono: telefono,
        email: email, 
        fecha: new Date(), 
        total: this.budgetService.calculateTotalCost()    
    }
    this.listaPresupuestos.push(presupuestoGuardar);
    console.log("Presupuesto creado: ", presupuestoGuardar);
    console.table(this.listaPresupuestos);
  }  
}

