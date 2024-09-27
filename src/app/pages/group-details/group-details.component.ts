import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interfaces/interfaces';
import { GroupsService } from 'src/app/services/groups.service';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonNav,
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonFab,
  IonFabButton,
  IonModal,
} from '@ionic/angular/standalone';
import { AddExpanseModalComponent } from 'src/app/components/add-expanse-modal/add-expanse-modal.component';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
  standalone: true,
  imports: [
    IonModal,
    IonFabButton,
    IonFab,
    IonIcon,
    IonLabel,
    IonItem,
    IonList,
    IonContent,
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonButtons,
    IonBackButton,
    IonNav,
    IonTitle,
    IonToolbar,
    IonHeader,
    AddExpanseModalComponent,
    CurrencyPipe
  ],
})
export class GroupDetailsComponent implements OnInit {
  groupsService = inject(GroupsService);
  private route = inject(ActivatedRoute);
  group: Group | null = null;
  groupId = '';
  component = GroupDetailsComponent;
  presentingElement: any = null;
  @ViewChild(IonModal) modal!: IonModal;
  name = '';

  constructor() {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.groupId = params['id'];
    });
    this.groupsService.getGroupData(this.groupId);
    this.presentingElement = document.querySelector('.ion-page');
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  
}
