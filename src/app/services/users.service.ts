import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { AuthUser, User } from '../interfaces/interfaces';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(Firestore);
  private collRef = collection(this.firestore, 'users');
  private router = inject(Router);

  public users: User[] = [];
  public user: User | null = null;

  constructor() {}

  register(user: AuthUser) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredeantial) => {
        const newUser = this.createUser(user, userCredeantial.user.uid);
        this.saveUser(newUser);
      })
      .then(() => {
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log('errorCode:', error.code);
        console.log('errorMessage:', error.message);
      });
  }

  login(user: AuthUser){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCreadential) => {
        this.router.navigate(['home']);
        // add things to do after login
      })
      .catch((err) => {
        console.log('errorCode:', err.code);
        console.log('errorMessage:', err.message);
      })
  }

  logout(){
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.router.navigate(['login']);
        // add things to do after logout
      })
      .catch((err) => {
        console.log('errorCode:', err.code);
        console.log('errorMessage:', err.message);
        
      })
  }

  createUser(user: AuthUser, uid: string): User {
    return {
      id: uid,
      email: user.email,
      name: user.name || '',
      groups: [],
      amount: 0,
    };
  }

  async saveUser(user: User) {
    const id = user.id;
    const userRef = doc(this.firestore, 'users', id);
    await setDoc(userRef, user).catch((err) => {
      console.log('errorCode:', err.code);
      console.log('errorMessage:', err.message);
    });
  }

  getUsersList() {
    const q = query(this.collRef, orderBy('name'));
    return onSnapshot(q, (list) => {
      this.users = [];
      list.forEach((element) => {
        const user = this.setUserObject(element.data());
        this.users.push(user);
      });
      console.log(this.users);
    });
  }

  setUserObject(user: any): User {
    return {
      id: user.id || '',
      email: user.email || '',
      name: user.name || '',
      groups: user.groups || [],
      amount: user.amount || [],
    };
  }
}
