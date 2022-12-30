import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherCustomActionComponent } from './weather-custom-action.component';

describe('WeatherCustomActionComponent', () => {
  let component: WeatherCustomActionComponent;
  let fixture: ComponentFixture<WeatherCustomActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ WeatherCustomActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeatherCustomActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
