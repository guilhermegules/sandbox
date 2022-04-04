import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterComponent } from './counter.component';

describe('CounterComponent', () => {
  let component: CounterComponent;
  let fixture: ComponentFixture<CounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CounterComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('counter observable operations', () => {
    it('should add values on counter$', (done) => {
      component.addValue();

      component.counter$.subscribe((counter) => {
        expect(counter).toBe(1);
        done();
      });
    });
    it('should remove values on counter$', (done) => {
      component.subtractValue();

      component.counter$.subscribe((counter) => {
        expect(counter).toBe(-1);
        done();
      });
    });
    it('should reset values on counter$ for zero', (done) => {
      component.addValue();
      component.addValue();

      component.resetValue();

      component.counter$.subscribe((counter) => {
        expect(counter).toBe(0);
        done();
      });
    });
  });
});
