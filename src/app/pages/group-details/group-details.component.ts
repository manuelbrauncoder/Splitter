import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/interfaces/interfaces';
import { GroupsService } from 'src/app/services/groups.service';
import { IonHeader, IonToolbar, IonTitle, IonNav, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonContent } from "@ionic/angular/standalone";

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
  standalone: true,
  imports: [IonContent, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonButtons, IonBackButton, IonNav, IonTitle, IonToolbar, IonHeader, ]
})
export class GroupDetailsComponent  implements OnInit {
  groupsService = inject(GroupsService);
  private route = inject(ActivatedRoute);
  group: Group | null = null;
  groupId = '';
  component = GroupDetailsComponent;

  constructor() { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = params['id'];
    });
    this.groupsService.getGroupData(this.groupId);
  }

}
