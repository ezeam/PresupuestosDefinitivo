import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BudgetService } from '../services/budget.service';

@Component({
  selector: 'app-datos-personales-presupuesto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './datos-personales-presupuesto.component.html',
  styleUrl: './datos-personales-presupuesto.component.css'
})
export class DatosPersonalesPresupuestoComponent {
  formularioDatosPersonales: FormGroup;

  constructor(private fb: FormBuilder, private budgetService: BudgetService) {
    this.formularioDatosPersonales = this.fb.group({
      nombre: "",
      telefono: 0,
      email: ""
    });
  }
}
