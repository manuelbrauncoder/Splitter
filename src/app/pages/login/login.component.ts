import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
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
  IonInputPasswordToggle, IonText } from '@ionic/angular/standalone';
import { AuthUser } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonText, 
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
    RouterLink,
    IonInputPasswordToggle
  ],
})
export class LoginComponent implements OnInit {
  usersService = inject(UsersService);
  private router = inject(Router);
  
  user: AuthUser = {
    email: '',
    password: ''
  }

  constructor() {}

  login(){
    this.usersService.login(this.user);
    this.clearInput();
  }

  clearInput(){
    this.user = {
      email: '',
      password: ''
    }
  }

  guestLogin(){
    const user: AuthUser = {
      email: 'guest@splitter.com',
      password: '123456'
    }
    this.usersService.login(user);
    this.clearInput();
  }

  ngOnInit() {}
}
