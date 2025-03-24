import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaturamentoGridComponent } from './faturamento-grid.component';

describe('FaturamentoGridComponent', () => {
  let component: FaturamentoGridComponent;
  let fixture: ComponentFixture<FaturamentoGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FaturamentoGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FaturamentoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
