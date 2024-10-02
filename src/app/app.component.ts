import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { addIcons } from 'ionicons';
import {
  add,
  airplane,
  cashOutline,
  codeOutline,
  statsChartOutline,
  homeOutline,
  trashOutline,
  addOutline,
  arrowDownCircleOutline,
  arrowForwardCircleOutline,
  personCircleOutline,
} from 'ionicons/icons';
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
  IonIcon,
  IonLabel, IonToast } from '@ionic/angular/standalone';
import { GroupsService } from './services/groups.service';
import { UsersService } from './services/users.service';
import { Auth, User, user } from '@angular/fire/auth';
import { Subscription } from 'rxjs';
import { UiServiceService } from './services/ui-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  styleUrls: ['app.component.scss'],
  imports: [IonToast, 
    IonLabel,
    IonIcon,
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
  uiService = inject(UiServiceService);
  private router = inject(Router);
  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  userSubscription?: Subscription;
  currentUser = '';


  unsubGroupsList;
  unsubUsersList;

  constructor() {
    addIcons({
      homeOutline,
      add,
      airplane,
      cashOutline,
      statsChartOutline,
      codeOutline,
      trashOutline,
      addOutline,
      arrowDownCircleOutline,
      arrowForwardCircleOutline,
      personCircleOutline
    });
    this.unsubUsersList = this.usersService.getUsersList();
    this.unsubGroupsList = this.groupsService.getGroupsList();
    this.userSubscription = this.user$.subscribe((authUser: User | null) => {
      if (authUser === null) {
        console.log('no user logged in');
        this.currentUser = 'unknown'
        this.router.navigate(['login']);

      } else {
        console.log('User:', authUser);
        this.currentUser = authUser.email || 'unknown';
      }
    });
  }

  

  ngOnDestroy(): void {
    this.unsubGroupsList();
    this.unsubUsersList();
    this.userSubscription?.unsubscribe();
  }
}
