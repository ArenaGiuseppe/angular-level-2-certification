import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TriviaCategoriesResponse } from '../models/trivia-categories-response.model';
import { TriviaCategories } from '../models/trivia-categories.model';
import { TriviaQuestionResponse } from '../models/trivia-questions-response.model';
import { TriviaQuestion } from '../models/trivia-questions.model';

@Injectable()
export class QuizService {
  private fullListUrl = 'https://opentdb.com/api_category.php';
  private questionListUrl = 'https://opentdb.com/api.php';

  constructor(private httpClient: HttpClient) {}

  getListOfCategories(): Observable<TriviaCategories[]> {
    return this.httpClient.get<TriviaCategoriesResponse>(this.fullListUrl).pipe(
      map(response => response.trivia_categories)
    );
  }
  

  getTriviaQuestions(category: string, difficulty: string): Observable<TriviaQuestion[]> {
    let params = new HttpParams();
    params = params.append('amount', '5');
    params = params.append('category', category);
    params = params.append('difficulty', difficulty);
    params = params.append('type', 'multiple');

    return this.httpClient.get<TriviaQuestionResponse>(this.questionListUrl, { params }).pipe(
      map(response => response.results)
    );
  }
  
  
}
