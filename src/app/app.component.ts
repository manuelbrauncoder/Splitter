import { Component, inject, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, airplane, cashOutline, codeOutline, statsChartOutline, homeOutline, trashOutline } from 'ionicons/icons';
import {
  IonApp,
  IonMenuToggle,
  IonRouterOutlet,
  IonToolbar,
  IonHeader,
  IonButtons,
  IonTitle,
  IonContent,
  IonMenu,
  IonMenuButton,
  IonNav,
  IonNavLink,
  IonRouterLink,
  IonList,
  IonItem,
  IonButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { GroupsService } from './services/groups.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonLabel, IonIcon, 
    IonMenuToggle,
    IonButton,
    IonItem,
    IonList,
    RouterModule,
    IonRouterLink,
    IonNavLink,
    IonNav,
    IonContent,
    IonTitle,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonMenuButton,
  ],
})
export class AppComponent implements OnDestroy {
  groupsService = inject(GroupsService);

  unsubGroupsList;


  constructor() {
    addIcons({homeOutline,add,airplane,cashOutline,statsChartOutline,codeOutline, trashOutline});

    this.unsubGroupsList = this.groupsService.getGroupsList();
  }

  ngOnDestroy(): void {
    this.unsubGroupsList();
  }
}
