import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonHeader,
  IonButtons,
  IonToolbar,
  IonItem,
  IonInput,
  IonContent,
  IonButton,
  IonTitle,
  IonSelect,
  IonSelectOption, IonIcon, IonList, IonLabel } from '@ionic/angular/standalone';
import { Group } from 'src/app/interfaces/interfaces';
import { GroupsService } from 'src/app/services/groups.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonIcon, 
    IonTitle,
    IonButton,
    IonContent,
    IonInput,
    IonItem,
    IonToolbar,
    IonButtons,
    IonHeader,
    FormsModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class AddGroupModalComponent {
  groupService = inject(GroupsService);
  userService = inject(UsersService);

  group: Group = {
    id: '',
    title: '',
    description: '',
    users: [],
    expanses: [],
    categories: [],
  };

  customCategory = '';

  categories = ['Lebensmittel', 'Unterkunft', 'Unterhaltung', 'Gesundheit', 'Freizeitaktivitäten'];
  customCategories: string[] = [];

  @Output() triggerClose = new EventEmitter<boolean>();
  @Output() triggerConfirm = new EventEmitter<boolean>();

  constructor() {}

  addNewCategoryToSelection() {    
    if (this.customCategory.length > 3) {
      this.customCategories.push(this.customCategory);
      this.customCategory = '';
    }
  }

  deleteItemFromSelection(index: number){
    this.customCategories.splice(index, 1);
  }

  triggerCloseInParent() {
    this.triggerClose.emit();
  }

  async triggerConfirmInParent(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted && !this.doesNameAlreadyExist()) {
      this.group.categories = [...this.group.categories, ...this.customCategories];
      this.group.id = this.groupService.getUuidv4();
      await this.groupService.saveGroup(this.group);
      console.log(this.group);
      this.triggerConfirm.emit();
    }
  }

  doesNameAlreadyExist(){
    return this.groupService.groups.some(group => group.title.trim().toLowerCase() === this.group.title.trim().toLowerCase());
  }
}
