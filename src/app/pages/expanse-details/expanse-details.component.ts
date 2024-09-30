import { CurrencyPipe, Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonTitle,
  IonList,
  IonItem,
  IonLabel, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Expanse } from 'src/app/interfaces/interfaces';
import { GroupsService } from 'src/app/services/groups.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-expanse-details',
  templateUrl: './expanse-details.component.html',
  styleUrls: ['./expanse-details.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, 
    IonLabel,
    IonItem,
    IonList,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    CurrencyPipe
  ],
})
export class ExpanseDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private location = inject(Location);
  groupsService = inject(GroupsService);
  userService = inject(UsersService);
  groupId = '';
  expanseIndex = 0;

  constructor() {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.groupId = params['id'];
      this.expanseIndex = params['index'];
    });
  }

  getExpanse(): Expanse {
    return this.groupsService.group?.expanses[this.expanseIndex]!;
  }

  async deleteExpanse(groupId: string, expanseIndex: number) {
    this.location.back();
    await this.groupsService.deleteExpanse(groupId, expanseIndex);
  }
}
