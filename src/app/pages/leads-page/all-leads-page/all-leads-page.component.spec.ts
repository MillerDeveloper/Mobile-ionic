import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLeadsPageComponent } from './all-leads-page.component';

describe('AllLeadsPageComponent', () => {
  let component: AllLeadsPageComponent;
  let fixture: ComponentFixture<AllLeadsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllLeadsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllLeadsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
