import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatRippleModule } from '@angular/material';
import { AppComponent } from './app.component';
import 'hammerjs';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { RouterModule } from '@angular/router';
import { routing } from './app.routing';
import { AngularFireModule } from 'angularfire2/angularfire2';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule } from '@angular/forms';
import { FirebaseService } from './services/firebase.service';
import { MomentModule } from 'angular2-moment';
import { NewCategoryComponent } from './new-category/new-category.component';
import { FlashcardComponent } from './flashcard/flashcard.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    NewCategoryComponent,
    FlashcardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatRippleModule,
    MomentModule,
    routing
  ],
  providers: [AuthService, FirebaseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
