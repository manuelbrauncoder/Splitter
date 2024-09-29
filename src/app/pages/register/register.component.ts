import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IonCardContent, IonItem, IonButtons, IonButton, IonCard, IonCardTitle, IonCardHeader, IonCardSubtitle, IonInput, IonFab, IonFabButton, IonContent, IonHeader, IonToolbar, IonTitle, IonBackButton } from "@ionic/angular/standalone";
import { AuthUser } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [IonBackButton, IonTitle, IonToolbar, IonHeader, IonContent, IonFabButton, IonFab, IonInput, IonCardSubtitle, IonCardHeader, IonCardTitle, IonCard, IonButton, IonButtons, IonItem, IonCardContent, FormsModule]
})
export class RegisterComponent  implements OnInit {
  userService = inject(UsersService);

  constructor() { }


  user: AuthUser = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  ngOnInit() {}

  onSubmit(ngForm: NgForm) {
    console.log('submit');
    
    if (ngForm.valid && ngForm.submitted) {
      console.log(this.user);
      this.userService.register(this.user)
    }
  }

}
