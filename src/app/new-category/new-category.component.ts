import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../models/category';
import { AuthService } from '../services/auth.service';
import { FlashCard } from '../models/flashcard';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';
import * as _ from 'underscore';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        animate(250, keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 })
        ]))
      ])
    ]),
    trigger('fadeInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        animate(250, keyframes([
          style({ opacity: 0 }),
          style({ opacity: 1 })
        ]))
      ]),
      transition(':leave', [
        animate(250, keyframes([
          style({ opacity: 1 }),
          style({ opacity: 0 })
        ]))
      ]),
    ]),
  ]
})
export class NewCategoryComponent implements OnInit {

  public category = new Category('',this.authService.getUserName(),Date.now(), new Array<FlashCard>());

  constructor(private router: Router, private authService: AuthService, private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.firebaseService.category().first().subscribe(category => {
      if(category){
        this.category = category;
      } else {
        this.add();
      }
    })
  }

  back(){
    this.router.navigate(['categories']);
  }

  add(){
    this.category.flashCards.push(new FlashCard())
    setTimeout(() => {
      var elements = document.getElementsByClassName('category');
      var element = elements[elements.length-1];
      var textarea = element.getElementsByTagName('textarea')[0];
      textarea.focus();
    })
  }

  remove(index){
    this.category.flashCards = _.without(this.category.flashCards,this.category.flashCards[index]);
  }

  canSave(){
    return this.category.title.length && this.category.flashCards.length && _.every(this.category.flashCards,(flashCard) => {
      return flashCard.title.length && flashCard.answer.length;
    });
  }

  save(){
    if(!this.canSave()) return;
    if(this.category.$key) {
      var $key = this.category.$key;
      delete this.category.$key;
      this.firebaseService.updateCategory($key,this.category);
    } else
      this.firebaseService.addCategory(this.category);
    this.back();
  }

}
