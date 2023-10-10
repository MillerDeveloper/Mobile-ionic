import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterpartiesPageComponent } from './counterparties-page.component';

describe('CounterpartiesPageComponent', () => {
  let component: CounterpartiesPageComponent;
  let fixture: ComponentFixture<CounterpartiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CounterpartiesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterpartiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
