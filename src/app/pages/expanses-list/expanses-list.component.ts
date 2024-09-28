import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonLabel,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonRouterLink
} from '@ionic/angular/standalone';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-expanses-list',
  templateUrl: './expanses-list.component.html',
  styleUrls: ['./expanses-list.component.scss'],
  standalone: true,
  imports: [
    IonCardContent,
    IonCardSubtitle,
    IonCardTitle,
    IonCardHeader,
    IonCard,
    IonLabel,
    IonItem,
    IonList,
    IonBackButton,
    IonButtons,
    IonToolbar,
    IonHeader,
    IonContent,
    CurrencyPipe,
    IonRouterLink,
    RouterModule
  ],
})
export class ExpansesListComponent implements OnInit {
  groupsService = inject(GroupsService);
  private route = inject(ActivatedRoute);
  groupId = '';

  constructor() {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.groupId = params['id'];
    });
    this.groupsService.getGroupData(this.groupId);
  }
}
