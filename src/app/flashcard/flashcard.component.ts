import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { FirebaseService } from '../services/firebase.service';
import 'rxjs/add/operator/first';
import { Router } from '@angular/router';
import * as _ from 'underscore';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss']
})
export class FlashcardComponent implements OnInit {

  public category: Category;
  public index = 0;
  public isOpen = false;
  constructor(private firebaseService: FirebaseService, private router: Router) { }

  ngOnInit() {
    this.firebaseService.category().first().subscribe(category => {
      this.category = category;
      this.category.flashCards = _.shuffle(this.category.flashCards);
    })
  }

  next($event: MouseEvent, container: HTMLElement){
    if(!this.isOpen || this.index == this.category.flashCards.length - 1) return;
    this.isOpen = false;
    container.classList.remove('active');
    this.index++;
    $event.stopPropagation();
  }

  open($event: MouseEvent, container: HTMLElement){
    if(this.isOpen) return;
    this.isOpen = true;
    container.classList.add('active');
    $event.stopPropagation();
  }

  back(){
    this.router.navigate(['categories']);
  }

}
