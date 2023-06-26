import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TriviaCategoriesComponent } from './trivia-categories/trivia-categories.component';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';

const routes: Routes = [
  { path: 'trivia-categories', component: TriviaCategoriesComponent },
  { path: 'quiz-results', component: QuizResultsComponent },
  { path: '', redirectTo: '/trivia-categories', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
