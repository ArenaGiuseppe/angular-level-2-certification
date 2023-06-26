import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { TriviaCategories } from '../models/trivia-categories.model';
import { QuizService } from '../services/quiz.service';
import { FormGroup, FormControl } from '@angular/forms';
import { TriviaQuestion } from '../models/trivia-questions.model';
import { Router } from '@angular/router';
import { QuizDataService } from '../services/quiz-data.service';

@Component({
  selector: 'app-trivia-categories',
  templateUrl: './trivia-categories.component.html',
  styleUrls: ['./trivia-categories.component.css'],
})
export class TriviaCategoriesComponent implements OnInit, AfterViewInit {
  @ViewChild('categorySelect') categorySelectRef!: ElementRef;
  @ViewChild('difficultySelect') difficultySelectRef!: ElementRef;
  @ViewChild('createBtn') createBtnRef!: ElementRef;

  myForm: FormGroup = new FormGroup({});
  categoriesList: TriviaCategories[] = [];
  triviaQuestions: TriviaQuestion[] = [];
  quizSubmitted = false;
  dropdownsSelected = false;

  constructor(
    private router: Router,
    private quizService: QuizService,
    private dataService: QuizDataService
  ) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      categories: new FormControl(),
      difficulty: new FormControl(),
    });
  
    this.quizService.getListOfCategories().subscribe((categories) => {
      this.categoriesList = categories;
    });
  }
  

  ngAfterViewInit() {
    const categorySelect = this.categorySelectRef
      .nativeElement as HTMLSelectElement;
    const difficultySelect = this.difficultySelectRef
      .nativeElement as HTMLSelectElement;
    const createBtn = this.createBtnRef.nativeElement as HTMLButtonElement;

    categorySelect.id = 'categorySelect';
    difficultySelect.id = 'difficultySelect';
    createBtn.id = 'createBtn';
  }

  generateQuiz() {
    const category = this.myForm.get('categories')?.value;
    const difficulty = this.myForm.get('difficulty')?.value;
  
    if (category && difficulty) {
      this.dropdownsSelected = true;
      this.quizService.getTriviaQuestions(category, difficulty).subscribe((questions) => {
        this.triviaQuestions = questions.map((question) => {
          const allAnswers = this.displayRandomlyOrderResponse(question);
          return { ...question, all_answers: allAnswers };
        });
      });
    } else {
      this.dropdownsSelected = false;
      this.triviaQuestions = [];
    }
  }

  get isCreateButtonDisabled(): boolean {
    const category = this.myForm.get('categories')?.value;
    const difficulty = this.myForm.get('difficulty')?.value;
    return !(category && difficulty);
  }
  

  displayRandomlyOrderResponse(question: TriviaQuestion): string[] {
    const answers = [...question.incorrect_answers, question.correct_answer];

    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [answers[i], answers[j]] = [answers[j], answers[i]];
    }

    return answers;
  }

  selectAnswer(question: TriviaQuestion, index: number) {
    question.selectedAnswerIndex = index;
    question.selectedAnswer = question.all_answers[index];
  }

  allQuestionsAnswered(): boolean {
    return this.triviaQuestions.every(
      (question) => question.selectedAnswerIndex !== undefined
    );
  }

  submitQuiz() {
    this.quizSubmitted = true;
    this.dataService.triviaQuestions = this.triviaQuestions;
    this.router.navigate(['/quiz-results']);
  }
}
