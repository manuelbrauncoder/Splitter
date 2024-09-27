import { Component, OnInit } from '@angular/core';
import { IonTitle, IonButtons, IonToolbar, IonHeader, IonMenuButton, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, IonButtons, IonTitle, IonMenuButton]
})
export class AboutComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
