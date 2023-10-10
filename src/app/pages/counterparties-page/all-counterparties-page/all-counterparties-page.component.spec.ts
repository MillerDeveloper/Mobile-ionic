import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCounterpartiesPageComponent } from './all-counterparties-page.component';

describe('AllCounterpartiesPageComponent', () => {
  let component: AllCounterpartiesPageComponent;
  let fixture: ComponentFixture<AllCounterpartiesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllCounterpartiesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCounterpartiesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
