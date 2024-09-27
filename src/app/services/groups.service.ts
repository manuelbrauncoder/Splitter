import { inject, Injectable } from '@angular/core';
import {
  collection,
  doc,
  Firestore,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from '@angular/fire/firestore';
import { Group } from '../interfaces/interfaces';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  private firestore = inject(Firestore);
  private collRef = collection(this.firestore, 'groups');

  public groups: Group[] = [];
  public group: Group | null = null;

  getGroupSum(){
    let sum = 0;
    if (this.group?.expanses) {
      for (const expanse of this.group.expanses) {
        sum += expanse.amount;
      }
    }
    return sum;
  }

  getGroupsList() {
    const q = query(this.collRef, orderBy('title'));
    return onSnapshot(q, (list) => {
      this.groups = [];
      list.forEach((element) => {
        const group = this.setGroupObject(element.data());
        this.groups.push(group);
      });
    });
  }

  async getGroupData(id: string) {
    const docRef = doc(this.firestore, 'groups', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      this.group = this.setGroupObject(docSnap.data())
    } else {
      console.log('No such document!');
      
    }
  }

  getUuidv4() {
    return uuidv4();
  }

  async saveGroup(group: Group) {
    const id = group.id;
    const groupRef = doc(this.firestore, 'groups', id);
    await setDoc(groupRef, group).catch((err) => {
      console.log('Error saving Group', err);
    });
  }

  setGroupObject(group: any): Group {
    return {
      id: group.id,
      title: group.title,
      description: group.description,
      users: group.users,
      expanses: group.expanses,
      categories: group.categories,
    };
  }

  constructor() {}
}
