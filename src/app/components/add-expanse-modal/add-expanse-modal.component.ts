import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Expanse, Group } from 'src/app/interfaces/interfaces';
import {
  IonHeader,
  IonToolbar,
  IonButton,
  IonButtons,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonSelect,
  IonSelectOption,
} from '@ionic/angular/standalone';
import { FormsModule, NgForm } from '@angular/forms';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-add-expanse-modal',
  templateUrl: './add-expanse-modal.component.html',
  styleUrls: ['./add-expanse-modal.component.scss'],
  standalone: true,
  imports: [
    IonItem,
    IonInput,
    IonContent,
    IonTitle,
    IonButtons,
    IonButton,
    IonToolbar,
    IonHeader,
    FormsModule,
    IonSelect,
    IonSelectOption,
  ],
})
export class AddExpanseModalComponent implements OnInit {
  groupsService = inject(GroupsService);

  @Output() triggerClose = new EventEmitter<boolean>();
  @Output() triggerConfirm = new EventEmitter<boolean>();

  expanse: Expanse = {
    id: '',
    title: '',
    description: '',
    amount: 0,
    category: '',
    paidBy: '',
  };

  constructor() {}

  ngOnInit() {}

  triggerCloseInParent() {
    this.triggerClose.emit();
  }

  async triggerConfirmInParent(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      this.expanse.id = this.groupsService.getUuidv4();
      console.log(this.expanse);
      this.groupsService.group?.expanses.push(this.expanse);
      await this.groupsService.saveGroup(this.groupsService.group!);
      this.triggerConfirm.emit();
    }
  }
}
