import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFinancePageComponent } from './card-finance-page.component';

describe('CardFinancePageComponent', () => {
  let component: CardFinancePageComponent;
  let fixture: ComponentFixture<CardFinancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardFinancePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardFinancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
