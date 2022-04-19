import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeMapSandboxComponent } from './merge-map-sandbox.component';

describe('MergeMapSandboxComponent', () => {
  let component: MergeMapSandboxComponent;
  let fixture: ComponentFixture<MergeMapSandboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeMapSandboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeMapSandboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
