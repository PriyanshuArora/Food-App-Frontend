import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../Services/user.service';

@Pipe({
  name: 'filterByBranch'
})
export class FilterByBranchPipe implements PipeTransform {

  constructor(private userService:UserService) {}

  transform(list: any): any {
    
    const convertedList = [];

    for (let l of list) {
      if(l.branch.id == this.userService.getBranch()) {
        convertedList.push(l);
      }
    }

    return convertedList;
  }

}
