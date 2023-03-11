import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/posts.mode';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private readonly API = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.API}/posts`)
      .pipe(
        map((posts) =>
          posts.map((post) => ({ ...post, title: post.title.toUpperCase() }))
        )
      );
  }
}
