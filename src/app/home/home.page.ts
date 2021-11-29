import { Component } from '@angular/core';
import {CalculsService} from '../shared/services/calculs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public op=1;
  public num1;
  public num2;
  public tmp=0;
  public rep=0;
  public dec=0;
  public partDec=0;
  public count=0;
  public output;

  constructor(
    private calculs: CalculsService,
  ) {
    this.output='';
  }

  numberBuild=()=>{
    if(this.num1 && !this.num2){
      console.log('bouh');
      this.num2=0.0;
      this.num2=this.tmp+this.partDec/(10**this.count);
      console.log('num2 : ', this.num2);
    }
    else{
      if(!this.num1 && !this.num2)
      {
        console.log('coucou');
        this.num1=0.0;
        this.num1=this.tmp+this.partDec/(10**this.count);
        console.log('num1 : ', this.num1);
      }
    }
  };

  reinit=()=>{
    this.partDec=0;
    this.tmp=0;
    this.count=0;
    this.dec=0;
  };

  operation =(val)=>{
    switch(val) {
      case 1:
        this.output += '+';
        break;
      case 2:
        this.output+='-';
        break;
      case 3:
        this.output+='x';
        break;
      case 4:
        this.output+='/';
        break;
    }
    this.op=val;
    this.finish();
  };

  constructParts =(num)=>{
    if(num!=10){this.output+=num;}
    else{this.output+='.';}
    switch(num){
      case 10:
        this.dec=1;
        break;

      default:
        if(this.dec==0) {
          this.tmp = this.tmp * 10 + num;
        }
        else{
          this.partDec = this.partDec * 10 + num;
          this.count++;
        }
        break;
    }
  };

  equal=()=>{
    this.output='';
    this.finish();
  };

  finish=()=>{
    this.numberBuild();

    this.rep=this.calculs.build(this.num1, this.num2, this.op);

    console.log('num1 : ', this.num1, 'num2 : ', this.num2, 'op : ', this.op);
    console.log('rep : ', this.rep);
    console.log(this.num2);
    if(this.num2)
    {
      this.output+=this.rep;
    }
    this.num1=this.rep;
    delete this.num2;
    this.reinit();
  };

  reset=()=>{
    this.reinit();

    this.op=1;
    this.rep=0;
    delete this.num1;
    delete this.num2;
    delete this.output;

    console.clear();
  };
}
