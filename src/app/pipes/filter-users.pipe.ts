import { inject, Pipe, PipeTransform } from '@angular/core';
import { Group, User } from '../interfaces/interfaces';
import { GroupsService } from '../services/groups.service';

@Pipe({
  name: 'filterUsers',
  standalone: true
})
export class FilterUsersPipe implements PipeTransform {
  groupsService = inject(GroupsService);

  transform(users: User[], group: Group): User[] {
    if (!users || !group) {
      return [];
    }

    return users.filter(user => !group.users.includes(user.id));
  }

}
