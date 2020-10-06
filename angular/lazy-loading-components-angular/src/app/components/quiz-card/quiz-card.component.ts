import { Question } from './../../interfaces/question.interface';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-quiz-card',
  templateUrl: './quiz-card.component.html',
  styleUrls: ['./quiz-card.component.scss']
})
export class QuizCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() question: Question;
  @Output() questionAnswered = new EventEmitter<boolean>();

  public destroy = new Subject<any>()
  public answeredCorrectly: boolean;
  public questionImageUrl: string;
  constructor() { }

  ngOnInit(): void {
    if (this.question) {
      this.questionImageUrl = `assets/${this.question.image}`
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  answer(selectedAnswer: string): void {
    this.answeredCorrectly = selectedAnswer === this.question.correctAnswer;
    this.questionAnswered.next(this.answeredCorrectly);
  }
}
