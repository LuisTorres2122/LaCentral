import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesperdicioComponent } from './desperdicio.component';

describe('DesperdicioComponent', () => {
  let component: DesperdicioComponent;
  let fixture: ComponentFixture<DesperdicioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DesperdicioComponent]
    });
    fixture = TestBed.createComponent(DesperdicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
