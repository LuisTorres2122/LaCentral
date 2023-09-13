import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutMantenanceComponent } from './layout-mantenance.component';

describe('LayoutMantenanceComponent', () => {
  let component: LayoutMantenanceComponent;
  let fixture: ComponentFixture<LayoutMantenanceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutMantenanceComponent]
    });
    fixture = TestBed.createComponent(LayoutMantenanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
