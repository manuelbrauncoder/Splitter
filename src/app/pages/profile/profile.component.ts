import { Component, inject, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, 
    IonContent,
    IonButtons,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonMenuButton,
  ],
})
export class ProfileComponent implements OnInit {
  usersService = inject(UsersService);
  constructor() {}

  ngOnInit() {}
}
