window.onload = function(){

  
   getRandomWord();
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

        modifyDiv(data[0].word);
    })
    .catch((error)=>{
        console.log(error);
    
});
    //After response is complete, call the modifyDiv function.

}


function modifyDiv(word){
    // get div reference in HTML page 
let parentDiv = document.getElementById("myWord");
    //set innerHtml to the incoming word.
    parentDiv.innerHTML = word;
}