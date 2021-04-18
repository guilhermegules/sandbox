import { Component, OnInit } from '@angular/core';
import { GitHubReposData, ListService } from './services/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  public items: GitHubReposData[] = [];

  constructor(private listService: ListService) {}

  ngOnInit(): void {
    this.listService.getRepos('guilhermegules').subscribe(reposData => {
      console.log('service data', reposData);
      this.items = reposData;
    });
  }
}
