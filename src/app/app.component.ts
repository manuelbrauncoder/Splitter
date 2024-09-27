import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
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
export class AppComponent {
  constructor() {
    addIcons({ add });
  }
}
