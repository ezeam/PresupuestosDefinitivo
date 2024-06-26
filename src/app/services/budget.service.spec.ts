import { TestBed } from '@angular/core/testing';

import { BudgetService } from './budget.service';

describe('BudgetService', () => {
  let service: BudgetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetService);
    
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('Calcular coste tiene que devolver 120 en el caso de pasar como argumentos 2 páginas y 2 idiomas', () => {
    const result = service.calcularCoste(2, 2);
    expect(result).toBe(120);
  });
  
});
