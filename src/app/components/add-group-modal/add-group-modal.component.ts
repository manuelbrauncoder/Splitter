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
  IonSelectOption,
} from '@ionic/angular/standalone';
import { Group } from 'src/app/interfaces/interfaces';
import { GroupsService } from 'src/app/services/groups.service';

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
    IonSelectOption,
  ],
})
export class AddGroupModalComponent {
  groupService = inject(GroupsService);

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

  async triggerConfirmInParent(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      this.group.id = this.groupService.getUuidv4();
      await this.groupService.saveGroup(this.group);
      console.log(this.group);
      this.triggerConfirm.emit();
    }
  }
}
