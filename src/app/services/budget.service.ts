import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private homeCost = 0;
  private panelCost = 0;
  private totalCostSubject = new Subject<number>();

  private listaPresupuestosSubject = new BehaviorSubject<any[][]>([]);
  listaPresupuestos$ = this.listaPresupuestosSubject.asObservable();

  totalCost$ = this.totalCostSubject.asObservable();

  constructor() { }

  updateHomeCost(cost: number):void {
    this.homeCost = cost;
    console.log("Coste actualizado de la home", cost);
    this.calculateTotalCost();
  }

  updatePanelCost(cost: number):void {
    this.panelCost = cost;
    console.log("Coste actualizado del panel", cost);
    this.calculateTotalCost();
  }

    calculateTotalCost(): number {
    const totalCost = this.homeCost + this.panelCost;
    this.totalCostSubject.next(totalCost);
    console.log("Coste TOTAL", totalCost);
    return totalCost;
  }

  updatePresupuestos(presupuestos: any[][]): void {
    this.listaPresupuestosSubject.next(presupuestos);
  }

  getPresupuestos(): Observable<any[][]> {
    return this.listaPresupuestos$;
  }
}
