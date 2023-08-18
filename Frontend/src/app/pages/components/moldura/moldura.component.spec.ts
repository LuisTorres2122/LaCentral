import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MolduraComponent } from './moldura.component';

describe('MolduraComponent', () => {
  let component: MolduraComponent;
  let fixture: ComponentFixture<MolduraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MolduraComponent]
    });
    fixture = TestBed.createComponent(MolduraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
