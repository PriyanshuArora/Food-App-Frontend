import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderPipe',
  pure: false
})
export class OrderPipePipe implements PipeTransform {
  transform(orderList: any): any {
    const tempList:any = [];

    orderList.forEach((x: { id: any; name: any; price: any;}) => {
      if (tempList.some((item: { id: any; }) => { return item.id == x.id}))
      {
        tempList.forEach((k: { quantity: any; id: any; price: any;}) => {
          if (k.id == x.id) {
            k.quantity++;
            k.price = k.quantity * x.price;
          }
        });
      } 
      else {
        let a:any = {};
        a.id = x.id;
        a.quantity = 1;
        a.name = x.name;
        a.price = x.price;
        tempList.push(a);
      }
    });

    return tempList;
  }
}
