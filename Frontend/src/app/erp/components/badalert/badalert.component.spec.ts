import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadalertComponent } from './badalert.component';

describe('BadalertComponent', () => {
  let component: BadalertComponent;
  let fixture: ComponentFixture<BadalertComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BadalertComponent]
    });
    fixture = TestBed.createComponent(BadalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
