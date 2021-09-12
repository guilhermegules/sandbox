import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonGroupSemanticComponent } from './button-group-semantic.component';

describe('ButtonGroupSemanticComponent', () => {
  let component: ButtonGroupSemanticComponent;
  let fixture: ComponentFixture<ButtonGroupSemanticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonGroupSemanticComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonGroupSemanticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
