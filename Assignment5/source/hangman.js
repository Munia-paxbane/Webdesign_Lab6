window.onload= function(){
    console.log("Working");
    getRandomWord();
    
   
   
};
    var secretWord = "SecrectWord";
    secretWord = secretWord.toUpperCase();
    var displayedWord = "";
    var guess = "";
    var letterUsed = "";
    var wrongGuesses = 0;
    var wrongLetters = "";
    var allWrongLetters = "";
    var alreadyUsedLetter = true;

    
function loadGame(){

    loadImage(wrongGuesses);
    assignButton();
    
    setGuessWord();

    //get the secrect word & store it.
    //load the first image.
    //prep the display word.
    //load the guessed letters.
    //load Functionality to the button
}



function assignButton(){
    //set it so I was only 
    let input = document.getElementById("EnterInput");
    input.setAttribute("maxlength", "1");
    input.setAttribute("oninput", "changeCase(this)");
    
    let myButt = document.getElementById("EnterGuess");
    myButt.setAttribute("onclick", "checkGuess()");
    input.addEventListener("keydown", function(event){
        if (event.key === "Enter"){
           event.preventDefault();
        
        checkGuess();
        }

    });
}

//check to make sure only a letter is entered and change all letters to upprcase when typed in.
function changeCase(instance){
    let isAlpha = /^[a-zA-Z]$/;   //this is a REGEX (regular expression) which is a filter for data.
    if (isAlpha.test(instance.value)){
    instance.value = instance.value.toUpperCase();
    }
    else{
        instance.value ="";
    }
}

function checkGuess(){
    //create a variable to store and input element
    
    let guess = document.getElementById("EnterInput");
    //grab its value by useing .value
    var guessed = guess.value; 
    var guesscorrect = 0;
     if(allWrongLetters.search(guessed) == -1){
        alreadyUsedLetter =false;
     }
     if(alreadyUsedLetter==false){

        for (ig = 0; ig<secretWord.length; ig++ )
        {
            
            if (guessed == secretWord[ig]){
            guesscorrect ++;
            updateDisplayLetter(ig, guessed);
            }    
        }
        
           if(guesscorrect == 0 ){
                wrongGuesses++; 
                loadImage(wrongGuesses);
            }

        if(wrongGuesses>6 && wrongGuesses < 9){
            gameOver();
        }

  
        if( secretWord == displayedWord){
            youWin();
        }
        
    wrongLetters = guessed;
    allWrongLetters += guessed;
    console.log(guessed); //replace button clicked with that value.
    setguessedLetters();  
    alreadyUsedLetter = true;
    } 
 
    guess.value = "";
}

function loadImage(number){
    let imageName = `Hanged${number}.png`;
    console.log(imageName)
    var imageDiv = document.getElementById("Gallows")
    let imageTag = `<img src="assets/${imageName}" width = 100% alt="Image of Hangedman">`;
    imageDiv.innerHTML = imageTag
}

function updateDisplayLetter(index, letter){
    if (index<displayedWord.length){
        displayedWord = displayedWord.substring(0, index) + letter +
            displayedWord.substring(index + letter.length, displayedWord.length);
        let parentDiv = document.getElementById("displayWord");
        parentDiv.children[index].innerHTML = letter;
        console.log(`Displayed word: ${displayedWord}`);
    }
}

function setGuessWord(){
    let guessDiv = document.getElementById("Letters");
    let displayedDiv = '<div id ="displayWord" class = "displayWord">';
    let usedLetterDiv = '<div id= "usedLetters" class = "usedLetters"><div>';


    for (ii = 0; ii<secretWord.length ; ii++){
        displayedWord += "_";
        displayedDiv += "<span>_</span>";
    }

    displayedDiv += "</div>";
    //append used letter div to our displayword div
    displayedDiv += usedLetterDiv += "</div>";
    //put the display word div into the parent container.
    guessDiv.innerHTML = displayedDiv; 
}

function setguessedLetters(){
     let parentDiv = document.getElementById("usedLetters");
     parentDiv.innerHTML += wrongLetters;
}

function gameOver(){
   
     makeRefreshButton();
}

function youWin(){

    loadImage(10);
    makeRefreshButton();
}

function makeRefreshButton(){
    let buttonDiv = document.getElementById("Input");
    console.log(buttonDiv);
    let refreshButton = `<button id = "refresh">Play Again?</button>`;
    buttonDiv.innerHTML += refreshButton;
    let newbutt = document.getElementById("refresh");
    newbutt.setAttribute("onclick", "window.location.reload()");

}


function getRandomWord(){
    let randNum = Math.floor(Math.random() * 7) +2;
    console.log(randNum);
    //call the api 
    window.fetch(`https://random-words-api.kushcreates.com/api?language=en&words=1&length=${randNum}`)
        .then((response)=>{
        if(!response){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }   

        return response.json();
    })
    //get a response
    .then((data) =>{
        console.log(data);
        
        let isNotAlpha = /[^a-zA-Z]/

        if(isNotAlpha.test(data[0].word)){
            window.location.reload();
        }

        secretWord = data[0].word.toUpperCase();
        loadGame(); 
    })
    .catch((error)=>{
        console.log(error);
   
});

}
    //After response is complete, call the modifyDiv function.
