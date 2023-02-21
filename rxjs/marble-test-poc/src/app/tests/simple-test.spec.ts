import { of } from 'rxjs';

describe('Test with observables without done', () => {
  it('should set values on the list', () => {
    const list: string[] = [];

    of('Hello', 'RxJS').subscribe((value) => {
      list.push(value);
    });

    expect(list).toEqual(['Hello', 'RxJS']);
  });
});
