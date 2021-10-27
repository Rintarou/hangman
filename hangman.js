

//var characters = [
  //  'a', 'b', 'c', 'd', 'e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'
//];

var nbError = 0;

let tabError = [
    "./images/pendu1.jpg",
    "./images/pendu2.jpg",
    "./images/pendu3.jpg",
    "./images/pendu4.jpg",
    "./images/pendu5.jpg",
    "./images/pendu6.jpg",
    "./images/pendu7.jpg",
    "./images/pendu8.jpg",
    "./images/pendu9.jpg",
    "./images/pendu10.jpg",
    "./images/pendu11.jpg",
];

var chars= 'abcdefghijklmnopqrstuvwxyz';

var word = null;

function onLoad() {
    let pad = document.getElementById('input-pad');
    Array.from(chars).forEach( ( char, id )=>{
        pad.insertAdjacentHTML('beforeend', `
            <button id='`+char+`' class='btn btn-secondary'>`+char+`</button>
        `);
        document.getElementById( char ).addEventListener( 'click', characterClick );
    });
    
    word = 'elephant';

    resetWord();
}

function resetWord() {
    let wordDisplay = document.getElementById('word-display');

    wordDisplay.innerHTML = '';
    
    Array.from(word).forEach( (char, id) =>{
        wordDisplay.insertAdjacentHTML('beforeend', `
            <input size="1" disabled='true' id='word`+id+`'/>
        `);
    });
}

function characterClick( event ) {
    let letter = event.currentTarget.id;
    let objLetter = document.getElementById(letter);
    if (word.includes(letter)) {
        Array.from(word).forEach((char, id) => {
            if (letter == char) {
            let ipMot = document.getElementById("word" + id);
            ipMot.value = letter;
            }
        });
        objLetter.className = "btn btn-success";
    } else {
        let img = document.querySelector("#img");
        img.src = tabError[nbError];
        nbError++;
        objLetter.className = "btn btn-danger";
    }
    objLetter.disabled = true;
    if (nbError >= 11) {
        nbError = 11;
        endGame();

    } 
}

function rejouer() {
    Array.from(chars).forEach( ( char, id )=>{
        let obj = document.getElementById( char );
        obj.className='btn btn-secondary';
        obj.disabled = false;
    });

    word = 'grue';

    resetWord();
}

function endGame() {
    alert("C'est perdu !");

    Array.from( chars ).forEach( ( char, id ) => {
        document.getElementById(char).disabled = true;
    });
    
    Array.from( word ).forEach( (char, id) => {
        document.getElementById("word" + id).value = letter;
    });
}