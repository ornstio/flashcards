import { Routes, RouterModule } from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { CategoriesComponent } from "./categories/categories.component";
import { AuthService } from "./services/auth.service";
import { NewCategoryComponent } from "./new-category/new-category.component";
import { FlashcardComponent } from "./flashcard/flashcard.component";

const appRoutes: Routes = [
    { path: '', redirectTo: 'categories', pathMatch: 'full' },
    { path: 'categories', component: CategoriesComponent, canActivate: [AuthService] },
    { path: 'categories/new', component: NewCategoryComponent, canActivate: [AuthService], pathMatch: 'full' },
    { path: 'categories/:id', component: FlashcardComponent, canActivate: [AuthService] }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);