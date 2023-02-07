import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, filter, Observable, of, switchMap, take, tap } from 'rxjs';
import { Course } from '../../models/course';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { ConfirmationModalStatus } from 'src/app/shared/components/confirmation-modal/confirmation-modal.enum';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> = of([]);

  constructor(
    public dialog: MatDialog,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setCourses();
  }

  onAdd(): void {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course): void {
    this.router.navigate(['edit', course._id], { relativeTo: this.route });
  }

  onDelete(course: Course): void {
    this.dialog
      .open(ConfirmationModalComponent, {
        data: {
          title: `Deseja deletar o curso ${course.name}`,
        },
      })
      .afterClosed()
      .pipe(
        filter((response) => response !== ConfirmationModalStatus.CANCEL),
        switchMap(() =>
          this.coursesService.delete(course._id).pipe(
            tap(() => {
              this.setCourses();
            })
          )
        ),
        take(1)
      )
      .subscribe({
        next: () => {
          this.snackBar.open('Curso deletado com sucesso!', 'x', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center',
          });
        },
        error: () => {
          this.onError('Erro ao remover um curso');
        },
      });
  }

  onError(message: string): void {
    this.dialog.open(ErrorDialogComponent, {
      data: message,
    });
  }

  private setCourses(): void {
    this.courses$ = this.coursesService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar cursos.');
        return of([]);
      })
    );
  }
}
