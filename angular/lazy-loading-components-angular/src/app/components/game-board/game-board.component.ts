import { Component, ComponentFactoryResolver, Injector, OnDestroy, OnInit, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { QuizService } from './../../services/quiz.service';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit, OnDestroy {
  @ViewChild('quizContainer', { read: ViewContainerRef }) quizContainer: ViewContainerRef;

  public title = 'City Quiz';
  public quizStarted = false;

  private destroy = new Subject();

  constructor(private quizService: QuizService, private componentFactory: ComponentFactoryResolver, private injector: Injector) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  async showNewQuestion() {
    this.lazyLoadQuizCard();
  }

  async startQuiz() {
    await this.lazyLoadQuizCard();
    !!this.quizStarted;
  }

  private async lazyLoadQuizCard() {
    const { QuizCardComponent } = await import('../quiz-card/quiz-card.component');
    const quizCardFactory = this.componentFactory.resolveComponentFactory(QuizCardComponent);
    const { instance } = this.quizContainer.createComponent(quizCardFactory, null, this.injector);

    instance.question = this.quizService.getNextQuestion();
    instance.questionAnswered.pipe(
      takeUntil(instance.destroy)
    ).subscribe(() => this.showNewQuestion());

    (instance as any).ngOnChanges({
      question: new SimpleChange(null, instance.question, true)
    })
  }
}
