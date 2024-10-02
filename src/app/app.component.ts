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
  personAddOutline,
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
export class AppComponent implements OnDestroy, OnInit {
  groupsService = inject(GroupsService);
  usersService = inject(UsersService);
  uiService = inject(UiServiceService);
  router = inject(Router);
  
  unsubGroupsList;
  unsubUsersList;

  ngOnInit(): void {
    this.usersService.user$.subscribe(user => {
      if (user) {
        this.usersService.currentUserSig.set({
          email: user.email!,
          name: user.displayName!
        });
      } else {
        this.usersService.currentUserSig.set(null);
        this.redirectToLogin();
      }
      console.log(this.usersService.currentUserSig());
      
    })
  }

  redirectToLogin(){
    if (this.router.url !== '/login' || '/register') {
      this.router.navigate(['/login']);
    }
  }

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
      personCircleOutline,
      personAddOutline
    });
    this.unsubUsersList = this.usersService.getUsersList();
    this.unsubGroupsList = this.groupsService.getGroupsList();
  }

  ngOnDestroy(): void {
    this.unsubGroupsList();
    this.unsubUsersList();
  }
}
