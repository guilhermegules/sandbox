import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomDogListComponent } from './random-dog-list.component';

describe('RandomDogListComponent', () => {
  let component: RandomDogListComponent;
  let fixture: ComponentFixture<RandomDogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RandomDogListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RandomDogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
