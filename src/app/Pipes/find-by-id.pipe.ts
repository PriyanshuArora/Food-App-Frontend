import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'findById'
})
export class FindByIdPipe implements PipeTransform {

  transform(list: any, id: any): any {
    if(id == undefined || id == '') {
      return list;
    }
    
    const convertedList = [];

    for (let f of list) {
      if (f.id == id) {
        convertedList.push(f);
      }
    }    
    return convertedList;
  }

}
