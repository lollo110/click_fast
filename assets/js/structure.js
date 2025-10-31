const button = document.getElementById('button-clicker');
const counter = document.getElementById('counterClick');

let temp = document.getElementById('temp');
let count = 0;
let countdownStarted = false;
let timeLeft = 5;
let timer;
let score = document.getElementById('score');
let refresh = document.getElementById('refresh');
let gif = document.getElementById('gif');
let main = document.getElementById('main');


function countDown(){
    if (!countdownStarted){
        countdownStarted = true;

        timer = setInterval(function(){
            timeLeft--;
            if (timeLeft <= 0){
                clearInterval(timer);
                score.textContent = `Your final score is: ${count} clicks!`;
                button.disabled = true;
                temp.textContent = `Time left: 0 seconds`;
                refresh.style.display = 'block';
            } else {
                temp.textContent = `Time left: ${timeLeft} seconds`;}
        },1000);
    }
}

button.addEventListener('click', function (){
    if (!countdownStarted){
        countDown();
    }
    count++;
    counter.textContent = count;

})

refresh.addEventListener('click', function (){
    gif.style.display = 'block';
    setTimeout(function(){
        location.reload();
    }, 2800);
});