var view ={
    
    
    
    displayMessage:function(msg){

        var messageArea=document.getElementById('messageArea');
        messageArea.innerHTML=msg;

    },

    displayHit:function(location){
        var cell = document.getElementById(location);
        cell.setAttribute('class','hit');
    },

    displayMiss:function(location){
        var cell = document.getElementById(location);
        cell.setAttribute('class','Miss');
    }
}

// view.displayMiss("00");
// view.displayHit("34");   
// view.displayMiss("55");
// view.displayHit("12");
// view.displayMiss("25");
// view.displayHit("26");


var model ={
    boardsize:7,
    numShips:3,
    shipsSunk:0,
    shipLength:3,
    
    ships:[{ locations: ["06", "16", "26"], hits: ["", "", ""]},
           { locations: ["24", "34", "44"], hits: ["", "", ""]},
           { locations: ["10", "11", "12"], hits: ["", "", ""] }],
    
    isSunk: function(ship) {
        for (var i=0; i<this.shipLength; i++){
            if (ship.hits  !== 'hit' ) {
                return false;
            }
        }
        
        return true;
    },

    fire: function(guess){
        for (var i=0; i<this.numShips; i++){
            var ship= this.ships[i];
            locations=ship.locations;
            var index=locations.indexOf(guess);
            if (index>=0){
                ship.hits[index]='hit';

                if (this.isSunk){
                    this.shipLength++;
                }
                return true
            }
        
        }
        view.displayMiss(guess);
		view.displayMessage("You missed.");
        return false;   
    },


    generateShipLocations: function(){
        var locations;

        for (var i = 0; i< this.numShips; i++){
            do{
                locations=this.generateShip();
             

            } while (this.collision(locations));
            this.ship[i].locations = locations;
        }
        console.log('ship array : ');
        console.log(this.ships);

    
    
    },
   
    generateShip: function(){
        
        var direction = Math.floor(Math.random()*2);
        var row , col ;

        if (direction === 1) { // horizontal

            row = Math.floor(Math.random()*this.boardsize);
            col = Math.floor(Math.random()* (this.boardsize- this.shipLength + 1));

        } else{ // vertical

            row = Math.floor(Math.random()* (this.boardsize-this.shipLength + 1))
            col =  Math . floor(Math.random()* this.boardsize);
        }

        var newShipLocations=[];
        for(var i=0; i < this.shipLength; i++){
            if (direction===1){
                newShipLocations.push(row+ ""+(col + i));

            }else{
                newShipLocations.push((row+i)+ "" + col );
            }
        }
        return newShipLocations;
    },

    collision: function (locations){
        for (var i=0; i < this.numShips; i++){
            var ship = this.ships[i];
            for (var j=0; j < locations.length; j++){
                if (ship.locations.indexOf(location[j])>=0){
                    return true;
                }
            }
        }
        return false;
    }
     
};


var controller ={
    guesses:0,

    processGuess:function(guess){
        var location = parseGuess(guess);
        if (location){
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipsSunk === model.numShips){
                view.displayMessage('You dunk all my battlship , in ' + this.guesses + 'gueusses');

            }
        }
    }
}

function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("Oops, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);
		
		if (isNaN(row) || isNaN(column)) {
			alert("Oops, that isn't on the board.");
		} else if (row < 0 || row >= model.boardsize ||
		           column < 0 || column >= model.boardsize) {
			alert("Oops, that's off the board!");
		} else {
			return row + column;
		}
	}
	return null;
}   


// event handler 

function init(){

    // fire ! butoon
    var firebotton=document.getElementById('fireButton');
    firebotton.onclick=handlerFirebotton;

    // handler "return " key press

    var guessInput= document.getElementById('guessInput');
    guessInput.onkeypress=handlerKeyPress;

    // place the ship on the game board 

    model.generateShipLocations();
    
}

function handlerFirebotton(){

    var guessInput=document.getElementById("guessInput");
    var guess= guessInput.value;
    
    controller.processGuess(guess);
   
    guessInput.value='';

}

function handlerKeyPress(e){
    var fireButton=document.getElementById('fireButton');
    
    e=e || window.event;

    if (e.keyCode === 13) {
		fireButton.click();
		return false;
    }
}

window.onload=init;


// controller. processGuess("A0");

// controller.processGuess("A6");
// controller.processGuess("B6");
// controller.processGuess("C6");

