import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFinancesPageComponent } from './all-finances-page.component';

describe('AllFinancesPageComponent', () => {
  let component: AllFinancesPageComponent;
  let fixture: ComponentFixture<AllFinancesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllFinancesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllFinancesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
