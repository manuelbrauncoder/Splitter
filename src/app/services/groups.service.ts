import { inject, Injectable } from '@angular/core';
import { collection, Firestore, onSnapshot, orderBy, query } from "@angular/fire/firestore";
import { Group } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
  private firestore = inject(Firestore);
  private collRef = collection(this.firestore, 'groups');

  public groups: Group[] = [];

  getGroupsList(){
    const q = query(this.collRef, orderBy('title'));
    return onSnapshot(q, (list) => {
      this.groups = [];
      list.forEach((element) => {
        console.log(element.data());
        
      })
    })
  }

  setGroupObject(group: any): Group {
    return {
      id: group.id,
      title: group.title,
      description: group.description,
      users: group.users,
      expanses: group.expanses,
      categories: group.categories
    }
  }

  constructor() { }
}
