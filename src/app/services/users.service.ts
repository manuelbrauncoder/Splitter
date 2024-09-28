import { inject, Injectable } from '@angular/core';
import {
  collection,
  Firestore,
  onSnapshot,
  orderBy,
  query,
} from '@angular/fire/firestore';
import { User } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private firestore = inject(Firestore);
  private collRef = collection(this.firestore, 'users');

  public users: User[] = [];
  public user: User | null = null;

  constructor() {}

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
      name: user.name || '',
      groups: user.groups || [],
      amount: user.amount || [],
    };
  }
}
