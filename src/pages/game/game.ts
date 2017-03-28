import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Game page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})
export class GamePage {
  response: any;
  buttons: string[];
  movesCounter;
  isMuliplayer: Boolean

  constructor(private alertCtrl: AlertController, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
    // When entering we initialize all
    this.initialize();
    // Check if this will be a multiplayer or against the machine game
    this.isMuliplayer = navParams.get('multiplayer');
  }

  // This methond will set all buttons to the character "-" and the counters to 0
  initialize(){
    this.buttons = ["-","-","-","-","-","-","-","-","-"];
    this.movesCounter = 0;
    console.log("Inizialized!, counter is: " + this.movesCounter);
  }
  
  // Main method of the game, here we will execute all the events related with a human intervention
  // Currently it is only menant to play against the machine
  move(position) {
    this.buttons[position] = "X"
    this.movesCounter++;
    var isOver = this.checkIfOver();
    console.log("Is this over? " + isOver)
    if (isOver){
      return;
    }
    console.log("++counter is: " + this.movesCounter)
    
    // Every time the player moves, we check if he/she has won
    if (this.checkWinner("X")){
      this.showAlert("You Win!", "Player X have won, start again?", "YES!")
      return
    }
    
    this.machineMove();
    this.checkIfOver();
  }

  // Utility function to check if the number of moves in the game have reached the limit (9)
  checkIfOver(){
    console.log("Checking if is over...")
    if (this.movesCounter == 9){
      this.showAlert("Game Over", "This is a draw, start again?", "YES!");
      return true;
    }
    return false;
  }

  // Function to print a O on the desired position, increase counters 
  // and check if the machine have won the game
  machineMove(){

    // We get the status of the board and send it to the API
    var status = this.getStatus();
    var url = 'https://stujo-tic-tac-toe-stujo-v1.p.mashape.com/' + status + '/O';

    let headers: Headers = new Headers
    headers.set('X-Mashape-Key', 'MASHAPE_KEY_HERE')
    headers.set('Accept', 'application/json')

    // Making the request to the API
    this.http.get(url, {
        headers: headers
      }).subscribe(result => {
        // Perform an action with the result, in this case extract the recommendation
        var position = result.json().recommendation

        // Mark the O where the recommendation indicates
        this.buttons[position]="O";
        this.movesCounter++;
        console.log("++counter is: " + this.movesCounter)

        //Check if after this move O have won
        if (this.checkWinner("O")){
          this.showAlert("You Loose", "Player O have won, start again?", "YES!")
        }
      });
  }

  // Utility function to get the status string of the game eg: X--OO--XX
  // This is used to query the API we are using
  getStatus(){
    var result = ""
    this.buttons.forEach(element => {
      result += element;
    });
    return result;
  }

  // Utility function to show a dialog box
  showAlert(title, subTitle, buttonLabel){
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: subTitle,
      buttons: [{
        text: buttonLabel,
        handler: () => {
          this.initialize();
        }
      }]
    });
    alert.present();
  }

  // This fuction checks if a player has won the game, it will return true or false
  checkWinner(player){
    return this.winsRow(player) || this.winsColumn(player) || this.winsDiagonal(player);   
  }

  winsRow(player) {
    return this.allThree(player, 0, 1, 2) ||
           this.allThree(player, 3, 4, 5) ||
           this.allThree(player, 6, 7 ,8);
  }

  winsColumn(player) {
    return this.allThree(player, 0, 3, 6) ||
           this.allThree(player, 1, 4, 7) ||
           this.allThree(player, 2, 5, 8);
  }
  winsDiagonal(player) {
    return this.allThree(player, 0, 4, 8) ||
           this.allThree(player, 2, 4, 6);
  }
  allThree(player, cell_one, cell_two, cell_three) {
    return (this.buttons[cell_one] === player) && (this.buttons[cell_two] === player) && (this.buttons[cell_three] === player);
  }
  // Utility function to check if the view have loaded
  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');
  }

}
