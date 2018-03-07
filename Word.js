var Letters = require("./Letter");


function Word(word) {
  
  this.letters = word.split("").map(function(key) {
    return new Letters(key);
  });
}


Word.prototype.getSolution = function() {
  return this.letters.map(function(letter) { 
    return letter.getSolution(); 
  }).join(''); 
}


Word.prototype.toString = function() {
  return this.letters.join(' '); 
};

Word.prototype.guessLetter = function(key) {
  var foundLetters = false;
  this.letters.forEach(function(letter) {
    if (letter.guess(key)) {
      foundLetters = true;
    }
  });

  console.log("\n" + this + "\n");
  return foundLetters;
};


Word.prototype.guessedCorrectly = function() {
  return this.letters.every(function(letter) {
    return letter.visible;
  });
};

module.exports = Word;
