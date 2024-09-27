import { Component, inject, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { add, airplane, cashOutline, codeOutline, statsChartOutline } from 'ionicons/icons';
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
  IonButton,
} from '@ionic/angular/standalone';
import { GroupsService } from './services/groups.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [
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
    addIcons({ add, airplane, cashOutline, statsChartOutline, codeOutline });

    this.unsubGroupsList = this.groupsService.getGroupsList();
  }

  ngOnDestroy(): void {
    this.unsubGroupsList();
  }
}
