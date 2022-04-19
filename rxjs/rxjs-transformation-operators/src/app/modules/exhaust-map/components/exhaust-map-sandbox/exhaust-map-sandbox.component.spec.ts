import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExhaustMapSandboxComponent } from './exhaust-map-sandbox.component';

describe('ExhaustMapSandboxComponent', () => {
  let component: ExhaustMapSandboxComponent;
  let fixture: ComponentFixture<ExhaustMapSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExhaustMapSandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExhaustMapSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
