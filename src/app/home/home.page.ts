import { Component } from '@angular/core';
import {CalculsService} from '../shared/services/calculs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public op;
  public num1;
  public num2;
  public tmp=0;
  public rep=0;
  public dec=0;
  public partDec=0;
  public count=1;

  constructor(
    private calculs: CalculsService,
  ) {}

  operation =(val)=>{
    this.dec=0;
    if(this.num1){
      this.num2=this.tmp+this.partDec/(10*this.count);
      console.log(this.num2);
    }
    else{this.num1=this.tmp;}
    this.op=val;
  };

  constructNumber =(num)=>{
    switch(num){
      case 10:
        this.dec=1;
        break;

      default:
        console.log('autre');
        if(this.dec==0) {
          this.tmp = this.tmp * 10 + num;
          console.log('tmp : ', this.tmp);
        }
        else{
          this.partDec = this.partDec * 10 + num;
          this.count++;
          console.log('parDec : ', this.partDec);
        }
        break;
    }
  };

  finish=()=>{
    console.log('num1 : ', this.num1);
    console.log('num2 : ', this.num2);
    console.log('op : ', this.op);
    this.dec=0;
    this.rep=this.calculs.build(this.num1, this.num2, this.op)
    document.getElementById('output').innerHTML+=this.rep;
  };

}
