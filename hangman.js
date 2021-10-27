/* hangman.js
    controller for a game of hangman.
    methods: onLoad, resetWord, characterClick, endGame, replay
*/

var nbError = 0;
var nbCorrect = 0;
var word = null;

var chars= 'abcdefghijklmnopqrstuvwxyz';

let tabError = [
    './images/pendu1.jpg',
    './images/pendu2.jpg',
    './images/pendu3.jpg',
    './images/pendu4.jpg',
    './images/pendu5.jpg',
    './images/pendu6.jpg',
    './images/pendu7.jpg',
    './images/pendu8.jpg',
    './images/pendu9.jpg',
    './images/pendu10.jpg',
    './images/pendu11.jpg',
];

wordList = [
    'Sort',
    'Deguisement',
    'Squelette',
    'Lanterne',
    'Fantôme',
    'Toussaint',
    'Sorcière',
    'Citrouille',
    'Vampire',
    'Halloween',
    'Automne',
    'Bonbons',
    'Demon',
    'Zombie',
  ];

function onLoad() {

    let pad = document.getElementById('input-pad');

    Array.from(chars).forEach( ( char, id )=>{
        pad.insertAdjacentHTML('beforeend', `
            <button class='btn btn-dark' id='`+char+`'>`+char+`</button>
        `);
        document.getElementById( char ).addEventListener( 'click', characterClick );
    });

    resetWord();
}

function resetWord() {

    word = (wordList[Math.floor(Math.random() * wordList.length )]).toLowerCase();

    let wordDisplay = document.getElementById('word-display');
    wordDisplay.innerHTML = '';
    
    Array.from(word).forEach( (char, id) =>{
        wordDisplay.insertAdjacentHTML('beforeend', `
            <input size='1' disabled='true' id='word`+id+`'/>
        `);
    });
}

function characterClick( event ) {
    let letter = event.currentTarget.id;
    let objLetter = document.getElementById(letter);

    if (word.includes(letter)) {
        Array.from(word).forEach((char, id) => {
            if (letter == char) {
                let ipMot = document.getElementById('word' + id);
                ipMot.value = letter;
                nbCorrect++;
            }
        });
        objLetter.className = 'btn btn-success';
        if( nbCorrect >= word.length ) {
            alert(`C'est gagné! Bravo! Vous avez sauvé le bonhomme`);
            endGame();
        }
    } else {
        let img = document.querySelector('#img');
        img.src = tabError[nbError];
        nbError++;
        objLetter.className = 'btn btn-danger';
    }
    
    objLetter.disabled = true;

    if (nbError >= 11) {
        nbError = 11;
        alert(`C'est perdu ! Le mot etait : ` + word);
        endGame();
    } 
}

function endGame() {

    Array.from( chars ).forEach( ( char, id ) => {
        document.getElementById(char).disabled = true;
    });

    Array.from( word ).forEach( (char, id) => {
        document.getElementById('word' + id).value = char;
    });
}

function replay() {

    Array.from(chars).forEach( ( char, id )=>{
        let obj = document.getElementById( char );
        obj.className='btn btn-secondary';
        obj.disabled = false;
    });

    nbError = 0;
    nbCorrect = 0;

    resetWord();
}
