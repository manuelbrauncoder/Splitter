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
import { UsersService } from './services/users.service';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';

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
  usersService = inject(UsersService);

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription?: Subscription;

  unsubGroupsList;
  unsubUsersList;

  constructor() {
    addIcons({homeOutline,add,airplane,cashOutline,statsChartOutline,codeOutline, trashOutline});
    this.unsubUsersList = this.usersService.getUsersList();
    this.unsubGroupsList = this.groupsService.getGroupsList();
    this.userSubscription = this.user$.subscribe((authUser: User | null) => {
      if (authUser === null) {
        console.log('no user logged in');
      } else {
        console.log('User:', authUser);
      }
      
    })
  }

  ngOnDestroy(): void {
    this.unsubGroupsList();
    this.unsubUsersList();
    this.userSubscription?.unsubscribe();
  }
}
