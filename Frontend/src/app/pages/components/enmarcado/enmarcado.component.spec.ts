import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnmarcadoComponent } from './enmarcado.component';

describe('EnmarcadoComponent', () => {
  let component: EnmarcadoComponent;
  let fixture: ComponentFixture<EnmarcadoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EnmarcadoComponent]
    });
    fixture = TestBed.createComponent(EnmarcadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
