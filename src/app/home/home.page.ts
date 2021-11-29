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

  constructor(
    private calculs: CalculsService,
  ) {}

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
        document.getElementById('output').innerHTML += '+';
        console.log('+');
        break;
      case 2:
        document.getElementById('output').innerHTML += '-';
        console.log('-');
        break;
      case 3:
        document.getElementById('output').innerHTML += 'x';
        console.log('x');
        break;
      case 4:
        document.getElementById('output').innerHTML += '/';
        console.log('/');
        break;
    }
    this.op=val;
    this.finish();
  };

  constructParts =(num)=>{
    if(num!=10){document.getElementById('output').innerHTML+=num;}
    else{document.getElementById('output').innerHTML+='.';}
    switch(num){
      case 10:
        this.dec=1;
        break;

      default:
        if(this.dec==0) {
          this.tmp = this.tmp * 10 + num;
          console.log('tmp : ', this.tmp);
        }
        else{
          this.partDec = this.partDec * 10 + num;
          console.log('partDec : ', this.partDec);
          this.count++;
        }
        break;
    }
  };

  equal=()=>{
    // document.getElementById('output').innerHTML='';
    this.finish();
  };

  finish=()=>{
    this.numberBuild();
    console.log('fnum1 : ', this.num1);
    console.log('fnum2 : ', this.num2);
    console.log('op : ', this.op);

    this.rep=this.calculs.build(this.num1, this.num2, this.op);

    console.log('rep : ', this.rep);
    this.num1=this.rep;
    delete this.num2;
    this.reinit();
    document.getElementById('output').innerHTML='';
    document.getElementById('output').innerHTML+=this.num1;
  };
}
