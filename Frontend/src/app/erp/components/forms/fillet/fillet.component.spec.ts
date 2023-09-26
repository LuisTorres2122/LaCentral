import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilletComponent } from './fillet.component';

describe('FilletComponent', () => {
  let component: FilletComponent;
  let fixture: ComponentFixture<FilletComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilletComponent]
    });
    fixture = TestBed.createComponent(FilletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
