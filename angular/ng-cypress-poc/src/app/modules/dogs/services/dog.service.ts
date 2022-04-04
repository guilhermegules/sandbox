import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface DogResponse {
  message: string[];
  status: string;
}

interface BreedResponse {
  message: {
    [key: string]: string[];
  };
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class DogService {
  private readonly DOG_API = 'https://dog.ceo/api/breeds/image/random';
  private readonly DOG_API_BREEDS = 'https://dog.ceo/api/breeds/list/all';

  constructor(private http: HttpClient) {}

  public getRandomDogsByNumber(amount: number) {
    return this.http
      .get<DogResponse>(`${this.DOG_API}/${amount}`)
      .pipe(map((response) => response.message));
  }

  public getOneRandomDog() {
    return this.http
      .get<DogResponse>(this.DOG_API)
      .pipe(map((response) => response.message));
  }

  public getBreeds() {
    return this.http
      .get<BreedResponse>(this.DOG_API_BREEDS)
      .pipe(
        map((response) =>
          Object.keys(response.message).flatMap((breed) =>
            response.message[breed].length
              ? response.message[breed].map(
                  (subBreed) => `${breed}-${subBreed}`
                )
              : breed
          )
        )
      );
  }
}
