import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userList',
})
export class UserListPipe implements PipeTransform {
  transform(list: any, value: any, option: any): any {
    console.log(option);
    console.log(value);

    if (option == undefined || option == 'all') {
      return list;
    }

    const temp = [];

    for (let u of list) {
      if (option == 'bid') {
        if (u.role == 'Branch Manager' && u.branch.id == value) {
          temp.push(u);
        }
      } else if (option == 'uid') {
        if (u.id == value) {
          temp.push(u);
        }
      }
      if (u.role == option) {
        temp.push(u);
      }
    }
    
    return temp;
  }
}
