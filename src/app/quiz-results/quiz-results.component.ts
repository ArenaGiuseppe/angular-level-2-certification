import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizDataService } from '../services/quiz-data.service';
import { TriviaQuestion } from '../models/trivia-questions.model';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css'],
})
export class QuizResultsComponent implements OnInit {
  triviaQuestions: TriviaQuestion[] = [];
  finalScore = 0;

  constructor(private router: Router, private dataService: QuizDataService) {}

  ngOnInit() {
    this.triviaQuestions = this.dataService.triviaQuestions;
    this.calculateFinalScore();
  }


  calculateFinalScore() {
    this.finalScore = this.triviaQuestions.reduce((score, question) => {
      if (question.selectedAnswer === question.correct_answer) {
        return score + 1;
      }
      return score;
    }, 0);
  }

  redirectToQuizCreation() {
    this.router.navigate(['/trivia-categories']);
  }

  isAnswerCorrect(question: TriviaQuestion, answer: string): boolean {
    return question.correct_answer === answer;
  }

  isAnswerSelected(question: TriviaQuestion, answer: string): boolean {
    return question.selectedAnswer === answer;
  }
  
  isAnswerSelectedIncorrect(question: TriviaQuestion, answer: string): boolean {
    return question.selectedAnswer === answer && !this.isAnswerCorrect(question, answer);
  }
  
  

  getScoreColor(): string {
    if (this.finalScore >= 0 && this.finalScore <= 1) {
      return 'red';
    } else if (this.finalScore >= 2 && this.finalScore <= 3) {
      return 'yellow';
    } else {
      return 'green';
    }
  }
  
}
