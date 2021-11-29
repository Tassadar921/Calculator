import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalculsService {

  constructor() { }

  add=(num1, num2)=>{
    let tmp = num1.value + '+' + num2.value;
    return eval(tmp);
  };

  substract=(num1, num2)=>{
    return num1-num2;
  };

  multiply=(num1, num2)=>{
    return num1*num2;
  };

  divide=(num1, num2)=>{
    if(num2==0)
    {
      return 'DIVISION PAR 0';
    }
    else
    {
      return num1 / num2;
    }
  };

  build=(num1, num2, op)=>{
    let res;
    if(!num2){return num1;}
    switch(op){
      case 1:
        res=this.add(num1, num2);
        break;

      case 2:
        res=this.substract(num1, num2);
        break;

      case 3:
        res=this.multiply(num1, num2);
        break;

      case 4:
        res=this.divide(num1, num2);
        break;
    }
    return res;
  };
}
