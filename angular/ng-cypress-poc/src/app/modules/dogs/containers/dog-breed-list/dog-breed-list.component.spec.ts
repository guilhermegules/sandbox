import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { DogService } from '../../services/dog.service';

import { DogBreedListComponent } from './dog-breed-list.component';

describe('DogBreedListComponent', () => {
  let component: DogBreedListComponent;
  let fixture: ComponentFixture<DogBreedListComponent>;
  let dogService: DogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DogBreedListComponent],
      imports: [HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DogBreedListComponent);

    dogService = TestBed.inject(DogService);

    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSelectBreed', () => {
    it('should add value on dog observable', (done) => {
      spyOn(dogService, 'getDogByBreed').and.returnValue(of('akita'));

      component.onSelectBreed('akita');

      component.dog$.subscribe((dog) => {
        expect(dog).toBe('akita');
        done();
      });
    });
  });
});
