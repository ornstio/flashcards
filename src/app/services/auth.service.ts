import { Injectable } from '@angular/core';
import { Router, CanActivate } from "@angular/router";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class AuthService implements CanActivate {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
          this.router.navigate(['categories']);
        }
        else {
          this.userDetails = null;
          this.signInWithGoogle();
        }
      }
    );
  }

  getUserName(){
    return this.userDetails.displayName;
  }

  getUserId(){
    return this.userDetails.uid;
  }

  signInWithTwitter() {
    return this._firebaseAuth.auth.signInWithRedirect(
      new firebase.auth.TwitterAuthProvider()
    )
  }

  signInWithFacebook() {
    return this._firebaseAuth.auth.signInWithRedirect(
      new firebase.auth.FacebookAuthProvider()
    )
  }

  signInWithGoogle() {
    return this._firebaseAuth.auth.signInWithRedirect(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  isLoggedIn() {
    return this.userDetails != null
  }

  logout() {
    this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }

  canActivate(){
    return this.isLoggedIn();
  }
}