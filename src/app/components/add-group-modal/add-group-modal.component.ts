import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  IonSelectOption
} from '@ionic/angular/standalone';
import { Group } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-add-group-modal',
  templateUrl: './add-group-modal.component.html',
  styleUrls: ['./add-group-modal.component.scss'],
  standalone: true,
  imports: [
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
    IonSelectOption
  ],
})
export class AddGroupModalComponent {
  group: Group = {
    id: '',
    title: '',
    description: '',
    users: [],
    expanses: [],
    categories: [],
  };

  users = ['Manuel', 'Milena', 'Hans', 'Miley'];
  categories = ['Lebensmittel', 'Hund', 'Luxus'];

  @Output() triggerClose = new EventEmitter<boolean>();
  @Output() triggerConfirm = new EventEmitter<boolean>();

  constructor() {}

  triggerCloseInParent() {
    
    this.triggerClose.emit();
  }
  triggerConfirmInParent() {
    console.log(this.group);
    
    this.triggerConfirm.emit();
  }
}
