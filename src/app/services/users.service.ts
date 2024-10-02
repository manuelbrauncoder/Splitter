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
  Auth,
  AuthErrorCodes,
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
  errmsg = '';

  auth = inject(Auth);

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
      .catch((err) => {
        this.handleSignUpError(err.code);
      });
  }

  handleSignUpError(err: string) {
    switch (err) {
      case 'auth/email-already-in-use':
        this.errmsg = 'This email is already in use.';
        break;
      case 'auth/invalid-email':
        this.errmsg = 'Invalid email format.';
        break;
      case 'auth/weak-password':
        this.errmsg = 'Password is too weak.';
        break;
      case 'auth/operation-not-allowed':
        this.errmsg = 'Operation not allowed.';
        break;
      case 'auth/too-many-requests':
        this.errmsg = 'Too many requests. Try again later.';
        break;
      default:
        this.errmsg = 'An unknown error occurred.';
        break;
    }
  }

  login(user: AuthUser) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCreadential) => {
        this.router.navigate(['home']);
      })
      .catch((err) => {
        this.handleLoginError(err.code);
      });
  }

  handleLoginError(err: string) {
    switch (err) {
      case 'auth/wrong-password':
        this.errmsg = 'Wrong password, please try again.';
        break;
      case 'auth/invalid-email':
        this.errmsg = 'Email not found, please check your email.';
        break;
      case 'auth/user-not-found':
        this.errmsg = 'Please check your email and password';
        break;
      default:
        break;
    }
  }

  logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        this.router.navigate(['login']);
        // add things to do after logout
      })
      .catch((err) => {
        console.log('errorCode:', err.code);
        console.log('errorMessage:', err.message);
      });
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

  getUserFromId(id: string) {
    return this.users.find((user) => user.id === id);
  }
}
