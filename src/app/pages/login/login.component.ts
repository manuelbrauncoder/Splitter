import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader,
  IonRouterLink,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonInput,
  IonButtons,
  IonButton,
  IonContent,
} from '@ionic/angular/standalone';
import { AuthUser } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonButton,
    IonButtons,
    IonInput,
    IonItem,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonTitle,
    IonToolbar,
    IonHeader,
    FormsModule,
    CommonModule,
    IonRouterLink,
    RouterLink
  ],
})
export class LoginComponent implements OnInit {
  private usersService = inject(UsersService);
  
  user: AuthUser = {
    email: '',
    password: ''
  }

  constructor() {}

  login(){
    this.usersService.login(this.user);
  }

  guestLogin(){
    
  }

  ngOnInit() {}
}
