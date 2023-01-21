import { Pipe, PipeTransform } from '@angular/core';
import { CourseCategory } from '../../enums/category.enum';
import { MaterialIcon } from '../../enums/icon.enum';

@Pipe({
  name: 'category',
})
export class CategoryPipe implements PipeTransform {
  transform(value: string): string {
    switch (value) {
      case CourseCategory.FRONT_END:
        return MaterialIcon.CODE;
      case CourseCategory.BACK_END:
        return MaterialIcon.COMPUTER;
      default:
        return MaterialIcon.CODE;
    }
  }
}
