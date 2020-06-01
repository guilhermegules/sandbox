import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { User } from './../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private angularFireAuth: AngularFireAuth,
    private angularFireStore: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap((user) =>
        user
          ? this.angularFireStore.doc<User>(`users/${user.uid}`).valueChanges()
          : of(null)
      )
    );
  }

  public async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.angularFireAuth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  public async signOut() {
    await this.angularFireAuth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({uid, email, photoURL, displayName}: User) {
    const userRef: AngularFirestoreDocument<User> = this.angularFireStore.doc(
      `users/${uid}`
    );
    const data = {
      uid,
      email,
      photoURL,
      displayName
    };

    return userRef.set(data, { merge: true });
  }
}
