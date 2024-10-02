import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonTitle,
  IonContent, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-add-user-to-group-modal',
  templateUrl: './add-user-to-group-modal.component.html',
  styleUrls: ['./add-user-to-group-modal.component.scss'],
  standalone: true,
  imports: [IonSearchbar, IonContent, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader],
})
export class AddUserToGroupModalComponent implements OnInit {
  @Output() triggerClose = new EventEmitter<boolean>();

  triggerCloseInParent(){
    this.triggerClose.emit();
  }

  
  addUser(){
    this.triggerClose.emit();
  }

  constructor() {}

  ngOnInit() {}
}
