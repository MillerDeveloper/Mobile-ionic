import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaryPageComponent } from './diary-page.component';

describe('DiaryPageComponent', () => {
  let component: DiaryPageComponent;
  let fixture: ComponentFixture<DiaryPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiaryPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaryPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
