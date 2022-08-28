import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'foodById'
})
export class FoodByIdPipe implements PipeTransform {

  transform(list: any, id:any): any {
    const convertedList = [];

    for (let f of list) {
      if(f.id == id) {
        convertedList.push(f);
      }
    }
    return convertedList;
  }

}
