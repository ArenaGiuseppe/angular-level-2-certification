import { TriviaQuestion } from "./trivia-questions.model";

export interface TriviaQuestionResponse {
  response_code: number;
  results: TriviaQuestion[];
}
