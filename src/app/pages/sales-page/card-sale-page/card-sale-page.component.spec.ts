import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSalePageComponent } from './card-sale-page.component';

describe('CardSalePageComponent', () => {
  let component: CardSalePageComponent;
  let fixture: ComponentFixture<CardSalePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardSalePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardSalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
