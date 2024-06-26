import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Presupuesto } from '../interfaces/presupuesto';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {
  private homeCost = 0;
  private panelCost = 0;
  private totalCostSubject = new Subject<number>();

  private listaPresupuestosSubject = new BehaviorSubject<Presupuesto[]>([]);
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

  updatePresupuestos(presupuestos: Presupuesto[]): void {
    this.listaPresupuestosSubject.next(presupuestos);
  }

  addPresupuesto(presupuesto: Presupuesto): void {
    const currentPresupuestos = this.listaPresupuestosSubject.getValue();
    const updatedPresupuestos = [...currentPresupuestos, presupuesto];
    this.listaPresupuestosSubject.next(updatedPresupuestos);
  }

  getPresupuestos(): Observable<Presupuesto[]> {
    return this.listaPresupuestos$;
  }
}
