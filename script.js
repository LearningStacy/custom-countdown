const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000; //1 sec = 1000ms (default unit)
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//Set date input min with today's date
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

//Populate countdown
function updateDOM(){
    //fx will run/update every second
    countdownActive = setInterval(()=> {
        //current time and how far away from 1970
    const now = new Date().getTime();
    const distance = countdownValue - now;

    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour)/minute);
    const seconds = Math.floor((distance %minute) / second);

    //populate countdown
    countdownElTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
    

    //hide input
    inputContainer.hidden = true;
    //show countdown
    countdownEl.hidden = false;
    }, second);
}


//get values form form input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;

    //check for valid date aka check if user put date
    if(countdownDate === ''){
        alert("Please select a date for the countdown!");
    } else {
        //get number version of current Date, aka get the individual days/hr/min/sec
        countdownValue = new Date(countdownDate).getTime();

        updateDOM();
    }

}

//Reset all values
function reset(){
    //hide countdown, show input
    countdownEl.hidden = true;
    inputContainer.hidden = false;

    //stop countdown
    clearInterval(countdownActive);

    //reset values
    countdownTitle = '';
    countdownDate = '';
}

//event listener - to take w/e in form to place as initialized values
countdownForm.addEventListener('submit', updateCountdown);
//listener - to reset and go back to form
countdownBtn.addEventListener('click', reset);