import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcoComponent } from './marco.component';

describe('MarcoComponent', () => {
  let component: MarcoComponent;
  let fixture: ComponentFixture<MarcoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MarcoComponent]
    });
    fixture = TestBed.createComponent(MarcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
