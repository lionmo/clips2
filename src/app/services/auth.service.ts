import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import IUser from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private usersCollection: AngularFirestoreCollection<IUser>
  public isAuthenticated$: Observable<boolean> 
  public isAuthenticatedWithDelay$: Observable<boolean>

  constructor(
      private fireAuth: AngularFireAuth, 
      private db: AngularFirestore,
      private router: Router
    ) {
    this.usersCollection = db.collection('users')
    this.isAuthenticated$ = fireAuth.user.pipe(
      map(user => !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
   }
  public createUser = async (userData: IUser) => {
    if(!userData.password) {
      throw new Error('password not provided!')
    }
    const userCred = await this.fireAuth.createUserWithEmailAndPassword(
      userData.email, userData.password
    )
    if(!userCred.user) {
      throw new Error(`User can't be found`)
    }
    await this.usersCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phone: userData.phone
    })
    await userCred.user.updateProfile({
      displayName: userData.name
    })
  }

  async logout($event: Event) {
    $event.preventDefault()
    await this.fireAuth.signOut()
    await this.router.navigateByUrl('/')
  } 
}
