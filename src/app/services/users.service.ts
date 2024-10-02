import { inject, Injectable, signal } from '@angular/core';
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
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);
  private router = inject(Router);

  private collRef = collection(this.firestore, 'users');
  public users: User[] = [];

  errmsg = '';

  user$ = user(this.auth)
  currentUserSig = signal<AuthUser | null | undefined>(undefined)

  constructor() {}


  register(user: AuthUser): Observable<void>{
    const promise = createUserWithEmailAndPassword(this.auth, user.email, user.password!).then((response) => {
      updateProfile(response.user, {displayName: user.name});
      const newUser = this.createUser(user, response.user.uid);
      this.saveUser(newUser);
      this.currentUserSig.set({
        email: response.user.email!,
        name: user.name,
        id: response.user.uid
      })
    })
    .catch((err) => {
      this.handleSignUpError(err.code);
    });
    return from(promise);
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


  login(user: AuthUser): Observable<void> {
    const promise = signInWithEmailAndPassword(this.auth, user.email, user.password!)
      .then(() => {
        this.router.navigate(['/home']);
      })
    return from(promise);
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
    signOut(this.auth)
      .then(() => {
        this.router.navigate(['login']);
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

  getCurrentUserData(){
    let currentUser: User | null = null;
    if (this.auth.currentUser) {
      const uid = this.auth.currentUser.uid;
      const user = this.users.find(u => u.id === uid);
      currentUser = user!;
    }
    return currentUser;
  }
}
