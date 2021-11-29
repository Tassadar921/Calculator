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
  public count=0;
  public output;

  constructor(
    private calculs: CalculsService,
  ) {
    this.output='';
  }

  numberBuild=()=>{
    if(this.num1 && !this.num2){
      this.num2=0.0;
      this.num2=this.tmp+this.partDec/(10**this.count);
    }
    else{
      if(!this.num1 && !this.num2)
      {
        this.num1=0.0;
        this.num1=this.tmp+this.partDec/(10**this.count);
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
    if(this.op){this.finish(); this.op=val;}
    else{this.op=val; this.finish();}
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

    if(this.num2==0 && this.op==4){this.output='MANGE TES MORTS';}
    else {
      this.rep = this.calculs.build(this.num1, this.num2, this.op);
      this.rep = Math.round(this.rep * 100) / 100;

      if (this.num1 && this.num2) {
        this.output = '';
      }
      if (this.num2) {
        this.output += this.rep;
      }
      this.num1 = this.rep;
    }
    delete this.num2;
    this.reinit();
  };

  reset=()=>{
    this.reinit();

    this.rep=0;
    delete this.op;;
    delete this.num1;
    delete this.num2;
    delete this.output;

    console.clear();
  };
}
