import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayouterpComponent } from './layouterp.component';

describe('LayouterpComponent', () => {
  let component: LayouterpComponent;
  let fixture: ComponentFixture<LayouterpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LayouterpComponent]
    });
    fixture = TestBed.createComponent(LayouterpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
