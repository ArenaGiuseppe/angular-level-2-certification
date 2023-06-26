import { SafeHtml } from "@angular/platform-browser";

export interface TriviaQuestion {
  question: SafeHtml;
  all_answers: string[];
  category: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
  selectedAnswerIndex?: number;
  selectedAnswer?: string;
}
