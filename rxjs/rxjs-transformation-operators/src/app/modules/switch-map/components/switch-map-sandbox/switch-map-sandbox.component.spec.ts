import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchMapSandboxComponent } from './switch-map-sandbox.component';

describe('SwitchMapSandboxComponent', () => {
  let component: SwitchMapSandboxComponent;
  let fixture: ComponentFixture<SwitchMapSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchMapSandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchMapSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
