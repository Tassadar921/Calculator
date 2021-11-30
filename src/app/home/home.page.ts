import { Component, OnInit } from '@angular/core';
import {CalculsService} from '../shared/services/calculs.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public op; //type d'opération
  public num1; //var1
  public num2; //var2
  public partInt=0; //partie entière
  public partDec=0; //partie décimale
  public rep=0; //retour du résultat
  public dec=0; //si 0 alors on set partInt sinon c'est partDec
  public count=0; //le nombre de chiffres après la virgule
  public output; //affichage
  public histo=[]; //historique des calculs
  public signe;
  public sound=new Audio('../../assets/sounds/touche.wav');

  constructor(
    private calculs: CalculsService,
  ) {
    this.output='';
  }

  ngOnInit(){
    document.getElementById('displayHisto').style.display='none';
  }

  numberBuild=()=>{ //on construit num1 si !num2 et inversement à partir des parties entières et décimales enregistrées
    if(this.num1 && !this.num2){
      this.num2=this.partInt+this.partDec/(10**this.count);
    }
    else{
      if(!this.num1 && !this.num2)
      {
        this.num1=this.partInt+this.partDec/(10**this.count);
      }
    }
  };

  operation =(val)=>{ //concaténation dans l'ouput du type d'opération et trigger le la fonction finish
    if(this.op){this.finish(); this.op=val;}
    else{this.op=val; this.finish();}
    switch(val) {
      case 1:
        this.output += ' + ';
        this.signe = ' + ';
        break;
      case 2:
        this.output+=' - ';
        this.signe = ' - ';
        break;
      case 3:
        this.output+=' x ';
        this.signe = ' x ';
        break;
      case 4:
        this.output+=' / ';
        this.signe = ' / ';
        break;
    }
  };

  constructParts =(num)=>{ //on construit la partie entière et la partie décimale
    if(num!=10){this.output+=num;}// on affiche le chiffre entré
    else{this.output+='.';}// on affiche la virgule
    switch(num){
      case 10: //si clickEvent sur '.' alors on ira dans la partie réservée à la partie décimale pour la suite
        this.dec=1;
        break;

      default: //si clickEvent sur les chiffres
        if(this.dec==0) { //si on est dans la partie entière alors on ajoute le chiffre à droite
          this.partInt = this.partInt * 10 + num;
        }
        else{ //sinon c'est sur la partie décimale
          this.partDec = this.partDec * 10 + num;
          this.count++;
        }
        break;
    }
  };

  equal=()=>{ //fonction intermédiaire qui trigger sur un clickEvent de la touche '='
    this.output='';
    this.finish();
  };

  finish=()=>{ //fonction de calcul et de réinitialisation, fin de cycle
    this.numberBuild(); //on construit num1 ou num2 à partir des parties entières et décimales

    if(this.num2==0 && this.op==4){this.output='MANGE TES MORTS';} //si division par 0 on se fait insulter
    else { //sinon on renvoie vers le module de calcul
      this.rep = this.calculs.build(this.num1, this.num2, this.op);
      this.rep = Math.round(this.rep * 100) / 100; //arrondi à 0.01 près

      if (this.num1 && this.num2) { //trigger uniquement quand c'est pas la première fois qu'on clique sur un signe ou qu'on clique sur =

        this.histo.unshift(this.num1);
        this.histo[0]+=this.signe+this.num2+' = '+this.rep;

        this.output = '';
      }

      if (this.num2) { // on évite une duplication d'output
        this.output += this.rep;
      }
      this.num1 = this.rep; //on stocke le résultat dans num1 pour le prochain calcul
    }
    delete this.num2;// on réinitialise presque tout, sauf l'affichage et num1
    this.reinit();
  };

  reinit=()=>{ //reinitialisation partielle des variables
    this.partDec=0;
    this.partInt=0;
    this.count=0;
    this.dec=0;
  };

  reset=()=>{ //trigger clickEvent sur le bouton 'reset' => on clear absolument toutes les variables
    this.reinit();

    this.rep=0;
    delete this.op;;
    delete this.num1;
    delete this.num2;
    this.output='';

    console.clear();
  };

  hist=()=>{ //affichage ou non via clickEvent, et si affichage de l'historique alors on décale la page sur la droite
    if(document.getElementById('displayHisto').style.display=='none')
    {
      document.getElementById('displayHisto').style.display='block';
      document.getElementById('main').style.marginLeft='20%';
      document.getElementById('bouton').style.marginLeft='20%';
    }
    else
    {
      document.getElementById('displayHisto').style.display='none';
      document.getElementById('main').style.marginLeft='0';
      document.getElementById('bouton').style.marginLeft='0';
    }
  };

  copyRes=(line)=>{ //l'input prend la valeur de l'output de la ligne cliquée dans l'historique, clear des variables
    for(let i=0;i<line.length;i++){
      if(line[i]=='='){
        this.reset();
        this.output+=line.substr(i+1);
        this.num1=line.substr(i+1);
      }
    }
  };
}
