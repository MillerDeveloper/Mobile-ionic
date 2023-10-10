import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCounterpartyPageComponent } from './card-counterparty-page.component';

describe('CardCounterpartyPageComponent', () => {
  let component: CardCounterpartyPageComponent;
  let fixture: ComponentFixture<CardCounterpartyPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardCounterpartyPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardCounterpartyPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
