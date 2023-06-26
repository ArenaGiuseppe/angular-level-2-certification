import { Injectable } from '@angular/core';
import { TriviaQuestion } from '../models/trivia-questions.model';

@Injectable({
  providedIn: 'root',
})
export class QuizDataService {
  triviaQuestions: TriviaQuestion[] = [];

  constructor() {}
}
