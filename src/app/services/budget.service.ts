import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private homeCost = 0;
  private panelCost = 0;
  private totalCostSubject = new Subject<number>();

  totalCost$ = this.totalCostSubject.asObservable();

  constructor() { }

  updateHomeCost(cost: number) {
    this.homeCost = cost;
    console.log("Coste actualizado de la home", cost);
    this.calculateTotalCost();
  }

  updatePanelCost(cost: number) {
    this.panelCost = cost;
    console.log("Coste actualizado del panel", cost);
    this.calculateTotalCost();
  }

  private calculateTotalCost() {
    const totalCost = this.homeCost + this.panelCost;
    this.totalCostSubject.next(totalCost);
    console.log("Coste TOTAL", totalCost);
    
  }
}
