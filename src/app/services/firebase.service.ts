import { Injectable, OnInit, Inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Category } from '../models/category';
import { AngularFireDatabase } from 'angularfire2/database';
import "rxjs/add/operator/map";
import { AuthService } from './auth.service';

@Injectable()
export class FirebaseService {

  private $categories = this.db.list(`${this.authService.getUserId()}/categories`);
  private bsCategory = new BehaviorSubject<Category>(null);

  constructor(@Inject(AuthService) private authService: AuthService, private db: AngularFireDatabase) { }

  categories(){
    return this.$categories.map((values: Array<Category>) => {
      var categories = [];
      values.forEach(value => {
        var category = new Category(value.title, value.createdBy, value.createdOn, value.flashCards);
        category.$key = value.$key;
        categories.push(category);
      })
      return categories;
    });
  }

  addCategory(category: Category){
    this.$categories.push(category);
  }

  updateCategory($key: string, category: Category){
    this.db.object(`${this.authService.getUserId()}/categories/${$key}`).update(category);
  }

  deleteCategory(category: Category){
    this.db.object(`${this.authService.getUserId()}/categories/${category.$key}`).remove();
  }

  category(){
    return this.bsCategory.asObservable();
  }

  setCategory(category: Category){
    this.bsCategory.next(category);
  }


}
