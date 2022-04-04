import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-random-dog-list',
  templateUrl: './random-dog-list.component.html',
  styleUrls: ['./random-dog-list.component.scss'],
})
export class RandomDogListComponent implements OnInit {
  public dogs$: Observable<string[]> = of([]);

  constructor(private dogService: DogService) {}

  public ngOnInit(): void {
    this.getRandomDogs();
  }

  public getRandomDogs() {
    this.dogs$ = this.dogService.getRandomDogsByNumber(12);
  }
}
