import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../models/category';
import { Subject } from 'rxjs/Subject';
import { FirebaseService } from '../services/firebase.service';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/debounceTime';
import { AuthService } from '../services/auth.service';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        animate(250, keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 })
        ]))
      ])
    ])
  ]
})
export class CategoriesComponent implements OnInit, OnDestroy {

  public categories = new Array<Category>();
  public filteredCategories = new Array<Category>();
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public search: string = '';
  private bsSearch = new BehaviorSubject<string>(this.search);
  constructor(public firebaseService: FirebaseService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.firebaseService.setCategory(null);
    this.firebaseService.categories()
      .takeUntil(this.destroy$)
      .subscribe((categories) => {
        this.categories = categories;
        this.filter();
      });
  }

  filter() {
    this.bsSearch.next(this.search);
    this.bsSearch.asObservable().debounceTime(250).subscribe(() => {
      this.filteredCategories = this.categories ? this.categories.filter(category => {
        return category.title.toLowerCase().startsWith(this.search.toLowerCase()) ||
          category.createdBy.toLowerCase().startsWith(this.search.toLowerCase())
      }) : [];
    })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  add() {
    this.router.navigate(['categories','new']);
  }

  goTo(category: Category){
    this.firebaseService.setCategory(category);
    this.router.navigate(['categories',category.$key]);
  }

  edit(category: Category){
    this.firebaseService.setCategory(category);
    this.router.navigate(['categories','new'])
  }

}
