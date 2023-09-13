import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VidrioComponent } from './vidrio.component';

describe('VidrioComponent', () => {
  let component: VidrioComponent;
  let fixture: ComponentFixture<VidrioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VidrioComponent]
    });
    fixture = TestBed.createComponent(VidrioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
