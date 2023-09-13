import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilidadComponent } from './utilidad.component';

describe('UtilidadComponent', () => {
  let component: UtilidadComponent;
  let fixture: ComponentFixture<UtilidadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UtilidadComponent]
    });
    fixture = TestBed.createComponent(UtilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
