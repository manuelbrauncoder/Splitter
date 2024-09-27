import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core/components';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon,
  IonButton,
  IonModal,
  IonButtons,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';
import { Group } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonInput,
    IonItem,
    IonButtons,
    IonModal,
    IonButton,
    IonIcon,
    IonFab,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFabButton,
  ],
})
export class HomePage {
  name = '';
  @ViewChild(IonModal) modal!: IonModal;

  message = '';

  group: Group = {
    id: '',
    title: '',
    description: '',
    users: [],
    expanses: [],
    categories: []
  }

  constructor() {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
