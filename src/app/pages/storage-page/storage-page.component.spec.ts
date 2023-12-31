import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesPageComponent } from './storage-page.component';

describe('FilesPageComponent', () => {
  let component: FilesPageComponent;
  let fixture: ComponentFixture<FilesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
