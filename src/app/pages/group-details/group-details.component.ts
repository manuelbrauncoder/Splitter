import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  IonRouterLink, IonAlert } from '@ionic/angular/standalone';
import { AddExpanseModalComponent } from 'src/app/components/add-expanse-modal/add-expanse-modal.component';
import { CurrencyPipe, Location } from '@angular/common';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
  standalone: true,
  imports: [IonAlert, 
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
    CurrencyPipe,
    IonRouterLink,
    RouterModule
  ],
})
export class GroupDetailsComponent implements OnInit {
  groupsService = inject(GroupsService);
  uiService = inject(UiServiceService);
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  group: Group | null = null;
  groupId = '';
  component = GroupDetailsComponent;
  isAlertOpen = false;

  public alertButtons = [
    {
      text: 'Cancel',
      role: 'cancel',
      handler: () => {
      },
    },
    {
      text: 'Delete',
      role: 'destructive',
      handler: () => {
        this.deleteGroup();
      },
    },
  ];

  presentingElement: any = null;
  @ViewChild(IonModal) modal!: IonModal;
  name = '';

  constructor() {}

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

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

  async deleteGroup(){
    await this.groupsService.deleteGroup(this.groupsService.group!);
    this.location.back();
    this.uiService.setOpen(true, 'Group deleted');
  }

  
}
