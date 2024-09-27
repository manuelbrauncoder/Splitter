import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonMenuButton, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [IonContent, IonButtons, IonTitle, IonToolbar, IonHeader, IonMenuButton]
})
export class ProfileComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
