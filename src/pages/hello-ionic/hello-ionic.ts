import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { GamePage } from '../game/game';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  start(multiplayer) {

    if(multiplayer==1){
      this.navCtrl.push(GamePage, {
      isMultiplayer: true}); 
    }else{
      this.navCtrl.push(GamePage, {
      isMultiplayer: false});
    }
    
  }
}
