import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLeadPageComponent } from './card-lead-page.component';

describe('CardLeadPageComponent', () => {
  let component: CardLeadPageComponent;
  let fixture: ComponentFixture<CardLeadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardLeadPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardLeadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
