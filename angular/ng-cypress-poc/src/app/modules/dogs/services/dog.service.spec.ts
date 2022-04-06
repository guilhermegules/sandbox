import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { DogService } from './dog.service';

const dogResponseMock = {
  message: Array.from({ length: 12 }, (_, i) => `Message ${i}`),
  status: 'success',
};

const breedListMock = {
  message: {
    akita: [],
    beagle: [],
    hound: ['afghan', 'basset'],
  },
  status: 'success',
};

describe('DogService', () => {
  let service: DogService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(DogService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getRandomDogsByNumber', () => {
    it('should make the request passing the number of the items and return only the messages', (done) => {
      service.getRandomDogsByNumber(12).subscribe((dogs) => {
        expect(dogs).toEqual(dogResponseMock.message);
        done();
      });

      const dogsRequest = httpMock.expectOne(
        'https://dog.ceo/api/breeds/image/random/12'
      );

      dogsRequest.flush(dogResponseMock);

      expect(dogsRequest.request.method).toBe('GET');
    });
  });

  describe('getBreeds', () => {
    it('should make the request for get all the breeds formatting the items for return an array of breeds', (done) => {
      service.getBreeds().subscribe((breeds) => {
        expect(breeds).toEqual(['akita', 'beagle', 'hound']);
        done();
      });

      const breedRequest = httpMock.expectOne(
        'https://dog.ceo/api/breeds/list/all'
      );

      breedRequest.flush(breedListMock);

      expect(breedRequest.request.method).toBe('GET');
    });
  });

  describe('getDogByBreed', () => {
    it('should make the request for get one dog based on the passed breed', (done) => {
      service.getDogByBreed('akita').subscribe((dog) => {
        expect(dog).toEqual('akita');
        done();
      });

      const dogByBreed = httpMock.expectOne(
        'https://dog.ceo/api/breed/akita/images/random'
      );

      dogByBreed.flush({ message: 'akita', status: 'success' });

      expect(dogByBreed.request.method).toBe('GET');
    });
  });
});
