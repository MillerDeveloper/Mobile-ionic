import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadsPageComponent } from './leads-page.component';

describe('LeadsPageComponent', () => {
  let component: LeadsPageComponent;
  let fixture: ComponentFixture<LeadsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
