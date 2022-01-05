import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoEditModalComponent } from './todo-edit-modal.component';

describe('TodoEditModalComponent', () => {
  let component: TodoEditModalComponent;
  let fixture: ComponentFixture<TodoEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoEditModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
