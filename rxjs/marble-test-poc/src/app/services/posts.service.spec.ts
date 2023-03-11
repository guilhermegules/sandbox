import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { PostsService } from './posts.service';

describe('PostsService', () => {
  let service: PostsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(PostsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getPosts', () => {
    it('should get posts', (done) => {
      const postsMock = [
        {
          userId: 1,
          id: 1,
          title: 'Test title 1',
          body: 'test body 1',
        },
        {
          userId: 2,
          id: 2,
          title: 'Test title 2',
          body: 'test body 2',
        },
      ];

      service.getPosts().subscribe((posts) => {
        expect(posts).toEqual(
          postsMock.map((post) => ({
            ...post,
            title: post.title.toUpperCase(),
          }))
        );
        done();
      });

      httpMock
        .expectOne('https://jsonplaceholder.typicode.com/posts')
        .flush(postsMock);
    });
  });
});
