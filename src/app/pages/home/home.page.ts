import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewChild } from '@angular/core';
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
  IonLabel,
  IonList,
  IonMenuButton,
  IonMenu,
  IonRouterLink, IonCard, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { Group } from 'src/app/interfaces/interfaces';
import { AddGroupModalComponent } from 'src/app/components/add-group-modal/add-group-modal.component';
import { GroupsService } from 'src/app/services/groups.service';
import { RouterModule } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonCardTitle, IonCardHeader, IonCard, 
    IonList,
    IonLabel,
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
    AddGroupModalComponent,
    RouterModule,
    IonMenuButton,
    IonMenu,
    IonRouterLink
  ],
})
export class HomePage implements OnInit {
  name = '';
  @ViewChild(IonModal) modal!: IonModal;
  public groupsService = inject(GroupsService);
  public usersService = inject(UsersService);

  presentingElement: any = null;

  constructor() {}

  ngOnInit() {
    this.presentingElement = document.querySelector('.ion-page');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
    }
  }
}
