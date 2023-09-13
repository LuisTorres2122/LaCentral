import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassepartoutComponent } from './passepartout.component';

describe('PassepartoutComponent', () => {
  let component: PassepartoutComponent;
  let fixture: ComponentFixture<PassepartoutComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassepartoutComponent]
    });
    fixture = TestBed.createComponent(PassepartoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
