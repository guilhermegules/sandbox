import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DogService } from '../../services/dog.service';

@Component({
  selector: 'app-dog-breed-list',
  templateUrl: './dog-breed-list.component.html',
  styleUrls: ['./dog-breed-list.component.scss'],
})
export class DogBreedListComponent implements OnInit {
  public breeds$: Observable<string[]> = of([]);
  public dog$: Observable<string> = of('');

  constructor(private dogService: DogService) {}

  public ngOnInit(): void {
    this.breeds$ = this.dogService.getBreeds();
  }

  public onSelectBreed(breed: string) {
    this.dog$ = this.dogService.getDogByBreed(breed);
  }
}
