import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import {
  IonCardContent,
  IonItem,
  IonButtons,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardSubtitle,
  IonInput,
  IonFab,
  IonFabButton,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonInputPasswordToggle, IonLabel, IonText } from '@ionic/angular/standalone';
import { AuthUser } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonText, IonLabel, 
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    IonFabButton,
    IonFab,
    IonInput,
    IonCardSubtitle,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    IonButton,
    IonButtons,
    IonItem,
    IonCardContent,
    FormsModule,
    IonInputPasswordToggle,
    IonText
  ],
})
export class RegisterComponent implements OnInit {
  usersService = inject(UsersService);

  constructor() {}

  user: AuthUser = {
    name: '',
    email: '',
    password: '',
  };

  ngOnInit() {}

  onSubmit(ngForm: NgForm) {

    if (ngForm.valid && ngForm.submitted) {
      this.usersService.register(this.user);
      this.clearInput();
    }
  }

  clearInput(){
    this.user = {
      name: '',
      email: '',
      password: '',
    }
  }
}
