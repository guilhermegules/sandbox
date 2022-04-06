import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

interface DogResponse {
  message: string[];
  status: string;
}

interface DogByBreedResponse {
  message: string;
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
  private readonly DOG_API_BREED = 'https://dog.ceo/api/breed';

  constructor(private http: HttpClient) {}

  public getRandomDogsByNumber(amount: number) {
    return this.http
      .get<DogResponse>(`${this.DOG_API}/${amount}`)
      .pipe(map((response) => response.message));
  }

  public getDogByBreed(breed: string) {
    return this.http
      .get<DogByBreedResponse>(`${this.DOG_API_BREED}/${breed}/images/random`)
      .pipe(map((response) => response.message));
  }

  public getBreeds() {
    return this.http
      .get<BreedResponse>(this.DOG_API_BREEDS)
      .pipe(
        map((response) =>
          Object.keys(response.message).flatMap((breed) => breed)
        )
      );
  }
}
