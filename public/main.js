let wordList = ['do', 'me', 'us', 'we', 'my', 'is', 'at', 'so', 'an', 'am'];
let currentWord;
let userGuess;
let count = 0;
const synthesis = window.speechSynthesis;
let utterance = new SpeechSynthesisUtterance("Hello World");
let level = 1;
let wrongGuesses = 10;
let highScore = 0;
let score = 0;

function getWord() {
    //picking a random word from the word list
    currentWord = wordList[Math.floor(Math.random() * wordList.length)];
    if(wordList.length === 0 ) {
        //setting up the end of the game
        document.getElementById('help').innerHTML = 'Game Over. No more words to spell';
        utterance.text = 'Game over';
        synthesis.speak(utterance);
    } else {
        //having the computer say the word for the user to spell
        document.getElementById('help').innerHTML = '';
        utterance.text = currentWord;
        synthesis.speak(utterance);
        console.log(currentWord);
    }
   
}
//getting user input and checking word
 checkWord = () => {
    if (document.getElementById('text').value != null) {
        if (userGuess === currentWord) {
            //this is the section for correct guesses
            count++;
            score = score + (level * count);
            if (score > highScore) {
                highScore = score;
                document.getElementById('highScore').innerHTML = 'The higest score is ' + highScore;            }
            if (count === 10) {
                level++;
                getLeveledWord();
                count = 0;
                document.getElementById('help').innerHTML = 'You leveled up!';
                document.getElementById('count').innerHTML = 'Your game count is: ' + count;
                document.getElementById('score').innerHTML = 'Your score is ' + score;
                document.getElementById('level').innerHTML = 'You are currently on level ' + level;
            }
            document.getElementById('count').innerHTML = 'Your game count is: ' + count;
            document.getElementById('help').innerHTML = '';
            document.getElementById('score').innerHTML = 'Your score is ' + score;
            document.getElementById('text').value = "";
            for(let i = 0; i <= wordList.length; i++) {
                if (wordList[i] === currentWord) {
                    wordList.splice(i, 1);
                }
            }
            getWord();
        }else {
            //this is the section for wrong guesses
            wrongGuesses --;
            document.getElementById('wrongGuess').innerHTML = 'You have ' + wrongGuesses + ' wrong guesses left';
            document.getElementById('help').innerHTML = 'Please try again and click get a new word';
            document.getElementById('text').value = "";
            utterance.text = 'Try again';
            synthesis.speak(utterance);
            if (wrongGuesses === 0) {
                gameOver();
            }
        }

    } else {
        document.getElementById('help').innerHTML = 'Please enter a word';
    }
}

//to use enter to check the answer
pressEnter = (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        userGuess = document.getElementById('text').value;
        checkWord();
    }

} 

//repeat the word if needed
repeatWord = () => {
    utterance.text = currentWord;
    synthesis.speak(utterance);
}

function getLeveledWord () {
    if(level === 2) {
        wordList = ['and', 'fun', 'dog', 'cow', 'sky', 'fly', 'fun', 'egg', 'ear', 'yes', 'red']
    } else if (level === 3) {
        wordList = ['time', 'wear', 'tree', 'leaf', 'rule', 'four', 'ruff', 'food', 'game', 'bite', 
        'them', 'this', 'star', 'wars', 'blue']
    } else if (level === 4) {
        wordList = ['flies', 'water', 'books', 'candy', 'plane', 'phone', 'snake', 'green', 'block',
        'paper']
    }
}

function gameOver () {
    document.getElementById('help').innerHTML = 'Game Over. Click get a new word to try again.';
    utterance.text = 'Game over';
    synthesis.speak(utterance);
    if(score > highScore) {
        highScore = score;
    }
    score = 0;
    level = 1;
    count = 0;
    wrongGuesses = 10;
    document.getElementById('count').innerHTML = 'Your game count is: ' + count;
    document.getElementById('score').innerHTML = 'Your score is ' + score;
    document.getElementById('level').innerHTML = 'You are currently on level ' + level;
    document.getElementById('wrongGuess').innerHTML = 'You have ' + wrongGuesses + ' wrong guesses left';
    document.getElementById('highScore').innerHTML = 'The higest score is ' + highScore
    getWord();
}
