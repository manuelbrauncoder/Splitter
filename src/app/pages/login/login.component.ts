import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonInput, IonButtons, IonButton } from '@ionic/angular/standalone';
import { User } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [IonButton, IonButtons, 
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
    FormsModule
  ],
})
export class LoginComponent implements OnInit {
  
  name ='';
  email = '';
  password = '';

  constructor() {}

  ngOnInit() {}
}
