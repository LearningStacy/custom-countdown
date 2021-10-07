const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateEl = document.getElementById('date-picker');
const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

let savedCountdown;

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

    //hide input
    inputContainer.hidden = true;

    //if countdown ended, show completed 
    if(distance < 0){
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
    } else{
        //show countdown in progress
        //populate countdown
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        //show countdown
        completeEl.hidden = true;
        countdownEl.hidden = false;

        }
    }, second);
}


//get values form form input
function updateCountdown(e){
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    //local storage - save countdown
    savedCountdown = {
        title: countdownTitle,
        date: countdownDate,
    };
    //if you see object [object] - you forgot to convert to string, bc storage only see strings
    localStorage.setItem('countdown', JSON.stringify(savedCountdown));

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
    completeEl.hidden = true;
    inputContainer.hidden = false; //show input container

    //stop countdown
    clearInterval(countdownActive);

    //reset values
    countdownTitle = '';
    countdownDate = '';
    //reset local storage
    localStorage.removeItem('countdown');
}

//get values back from storage
function restorePreviousCountdown(){
    //get countdown form storage if it is there
    if(localStorage.getItem('countdown')){
        inputContainer.hidden = true;
        savedCountdown = JSON.parse(localStorage.getItem('countdown'));
        countdownTitle = savedCountdown.title;
        countdownDate = savedCountdown.date;
        countdownValue = new Date(countdownDate).getTime();
        updateDOM();
    }
}

//event listener - to take w/e in form to place as initialized values
countdownForm.addEventListener('submit', updateCountdown);
//listener - to reset and go back to form
countdownBtn.addEventListener('click', reset);
//listener - reset after countdown is complete
completeBtn.addEventListener('click', reset);

//on load, check localStorage
restorePreviousCountdown();