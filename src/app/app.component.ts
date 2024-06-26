import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BudgetService } from './services/budget.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HomeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Presupuestos';
  totalCost: number = 0;

  constructor(private budgetService: BudgetService) {}

  OnInit():void {
    this.budgetService.totalCost$.subscribe(cost => {
      this.totalCost = cost;
    });
  }
}
