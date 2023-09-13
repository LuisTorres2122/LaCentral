import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileteComponent } from './filete.component';

describe('FileteComponent', () => {
  let component: FileteComponent;
  let fixture: ComponentFixture<FileteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileteComponent]
    });
    fixture = TestBed.createComponent(FileteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
