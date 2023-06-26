import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import { RootComponent } from './root/root.component';
import { QuizDataService } from './services/quiz-data.service';
import { QuizService } from './services/quiz.service';
import { TriviaCategoriesComponent } from './trivia-categories/trivia-categories.component';


@NgModule({
  declarations: [
    RootComponent,
    TriviaCategoriesComponent,
    QuizResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [QuizService,QuizDataService],
  bootstrap: [RootComponent]
})
export class AppModule { }
