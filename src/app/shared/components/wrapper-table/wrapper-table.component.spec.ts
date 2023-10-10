import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrapperTableComponent } from './wrapper-table.component';

describe('WrapperTableComponent', () => {
  let component: WrapperTableComponent;
  let fixture: ComponentFixture<WrapperTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrapperTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrapperTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
