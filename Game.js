var inquirer = require("inquirer");
var Word = require("./Word");
var words = require("./words");


function Game() {

  var input = this;

  this.play = function() {
    this.guessesLeft = 8;
    this.nextWord();
  };

  this.nextWord = function() {
    var randomWord = words[Math.floor(Math.random() * words.length)];
    this.currentWord = new Word(randomWord);
    console.log('\n' + this.currentWord + '\n');
    this.makeGuess();
  };


  this.makeGuess = function() {
    this.askForLetter().then(function() {
  
      if (input.guessesLeft < 1) {
        console.log(
          "Game Over! Word was: \"" + input.currentWord.getSolution() + "\"\n"
        );
        input.askToPlayAgain();
      }
      else if (input.currentWord.guessedCorrectly()) {
        console.log("You got it right! Next word!");
        input.guessesLeft = 8;
        input.nextWord();

      }
      else {
        input.makeGuess();
      }
    });
  };

  this.askToPlayAgain = function() {
    inquirer
      .prompt([
        {
          type: "confirm",
          name: "choice",
          message: "Play Again?"
        } 
      ])
      .then(function(val) {
        if (val.choice) {
          input.play();
        }
        else {
          input.quit();
        }
      });
  };

  this.askForLetter = function() {
    return inquirer
      .prompt([
        {
          type: "input",
          name: "choice",
          message: "Guess a letter!",
          validate: function(val) {
            return /[a-z1-9]/gi.test(val);
          }
        }
      ])
      .then(function(val) {

        var didGuessCorrectly = input.currentWord.guessLetter(val.choice);
        if (didGuessCorrectly) {
          console.log("\nCorrect!\n");

     
        }
        else {
          input.guessesLeft--;
          console.log("\nWrong!\n");
          console.log(input.guessesLeft + " guesses left!\n");
        }
      });
  };

  this.quit = function() {
    console.log("\nGame Over!");
    process.exit(0);
  };
}

var game = new Game();

game.play();

