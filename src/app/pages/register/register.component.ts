import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonCardContent, IonItem, IonButtons, IonButton, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonInput, IonFab, IonFabButton } from "@ionic/angular/standalone";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, IonInput, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonButton, IonButtons, IonItem, IonCardContent, FormsModule]
})
export class RegisterComponent  implements OnInit {

  constructor() { }

  name = '';
  email = '';
  password = '';
  confirmPassword = '';

  ngOnInit() {}

  onSubmit(ngForm: NgForm) {
    if (ngForm.valid && ngForm.submitted) {
      console.log(this.name);
      
    }
  }

}
