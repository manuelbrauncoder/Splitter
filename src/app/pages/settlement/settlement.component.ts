import { Component, inject, OnInit } from '@angular/core';
import { SettlementService } from 'src/app/services/settlement.service';
import {
  IonHeader,
  IonButtons,
  IonToolbar,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent, IonIcon, IonLabel, IonListHeader } from '@ionic/angular/standalone';
import { GroupsService } from 'src/app/services/groups.service';
import { Payments } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.scss'],
  standalone: true,
  imports: [IonListHeader, IonLabel, IonIcon, 
    IonCardContent,
    IonCardTitle,
    IonCardSubtitle,
    IonCardHeader,
    IonCard,
    IonItem,
    IonList,
    IonContent,
    IonBackButton,
    IonToolbar,
    IonButtons,
    IonHeader,
    CurrencyPipe
  ],
})
export class SettlementComponent implements OnInit {
  settleService = inject(SettlementService);
  groupsService = inject(GroupsService);
  usersService = inject(UsersService);

  payments: Payments[] = [];

  constructor() {}

  ngOnInit() {
    this.payments = this.settleService.settle(
      this.groupsService.group?.expanses!
    );
    console.log(this.payments);
  }
}
