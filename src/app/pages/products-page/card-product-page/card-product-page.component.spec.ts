import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardProductPageComponent } from './card-product-page.component';

describe('CardProductPageComponent', () => {
  let component: CardProductPageComponent;
  let fixture: ComponentFixture<CardProductPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardProductPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardProductPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
