let userName;
let className;
let scoreTotal = 0;
let accuracyTotal = 0;
let gameStatus = 0;

const scoreMax = 20000;
const headingText1 = document.getElementById(`headingText1`);
const headingText2 = document.getElementById(`headingText2`);
const headingText3 = document.getElementById(`headingText3`);
const nameValue = document.getElementById(`nameValue`);
const classValue = document.getElementById(`class`) 
const nextButton = document.getElementById(`next`);
const proceedButton = document.getElementById(`proceed`);
const idPage = document.getElementById(`id-page`);
const startButton = document.getElementById(`start`);

nextButton.onclick = getID;
proceedButton.onclick = proceed;
startButton.onclick = start;

// ID FOR NAME AND CLASS
function getID(){
    let userNameCheck = nameValue.value;
    let classNameCheck = classValue.value
    let userNameLength = userNameCheck.length;

    if(userNameCheck == 0 && classNameCheck == `invalid`){
        headingText1.textContent = `WOI`;
        headingText2.textContent = `FILL YOUR NAME AND CLASS`;
        headingText3.textContent = `↓ ↓ ↓`;
    } else if(userNameCheck == 0){
        headingText1.textContent = `WOI`
        headingText2.textContent = `FILL YOUR NAME`
        headingText3.textContent = `↓ ↓ ↓`;
    } 
    else if(classNameCheck == `invalid`){
        headingText1.textContent = `WOI`
        headingText2.textContent = `PICK YOUR CLASS`
        headingText3.textContent = `↓ ↓ ↓`;
    } else if(userNameLength >= 16){
        headingText1.textContent = `WOI`
        headingText2.textContent = `NAME TOO LONG BRO`
        headingText3.textContent = `↓ ↓ ↓`;
    } 
    else{ 
        console.log(userNameLength)
        userName = userNameCheck;
        className = classNameCheck;
        nextButton.style.display = `none`;
        proceedButton.style.display = `inline`;
        headingText1.textContent = `welcome ${userName} from ${className}!`;
        headingText2.textContent = `please click proceed to continue`;
        headingText3.textContent = `↓ ↓ ↓`; 
    }
}

// REMOVE THE ID-PAGE AND TRANSITION TO THE COUNTDOWN
const container = document.getElementById(`container`);

function proceed(){
    proceedButton.style.display = `none`;
    startButton.style.display = `block`;
    idPage.style.display = `none`;
    headingText1.textContent = `there are 20 questions in total`;
    headingText2.textContent = `best of luck :D`; 
    headingText3.textContent = `please do not use any calculators or other tools such as paper and pen`;
    container.style.display = `none`;
}

const heading1 = document.getElementById(`heading-1`);
const heading2 = document.getElementById(`heading-2`);
const container2 = document.getElementById(`container-2`)
const container3 = document.getElementById(`container-3`);
const UI = document.getElementById(`UI`);
const UIname = document.getElementById(`UI-name`);
const UIprogress = document.getElementById(`UI-progress`);
const UIclass = document.getElementById(`UI-class`);
const UIquestionBox = document.getElementById(`UI-question-box`);
const UIquestionText = document.getElementById(`UI-question-text`);
const UIanswerBox = document.getElementById(`UI-question-answer-box`);
const UIanswerText = document.getElementById(`UI-question-answer`);
const UIanswerText1 = document.getElementById(`UI-question-answer-1`);
const UIanswerText2 = document.getElementById(`UI-question-answer-2`);
const UIanswerSymbol = document.getElementById(`UI-question-answer-symbol`)
const UIsubmitBox = document.getElementById(`UI-question-submit-box`);
const UIsubmitButton = document.getElementById(`UI-question-submit`);

// SET UP THE QUESTIONS AND UI
function start(){
    startButton.style.display = `none`;
    heading1.style.display = `none`;
    heading2.style.display = `block`;
    heading2.style.top = `0px`;
    container2.style.display = `none`;
    container3.style.display = `block`;
    container3.style.top = `0px`;

    changeNameClass();
    countdown();
}

// CHANGE UI NAME AND UI CLASS ACCORDING TO THEIR INPUTS
function changeNameClass(){
    UIname.textContent = `Name: ${userName}`;
    UIclass.textContent = `Class: ${className}`;
}

// COUNTDOWN
let countdownTimer;
let count;

function countdown(){
    countdownTimer = 5;
    UIquestionText.textContent = `Game starts in ${countdownTimer}`;

    clearInterval(count);

    count = setInterval(() => {
       countdownTimer--;
       if (countdownTimer>0){
        UIquestionText.textContent = `Game starts in ${countdownTimer}`;
       } else if (countdownTimer == 0){
        UIanswerBox.style.display = `flex`;
        UIsubmitBox.style.display = `flex`;
        startGame();
       };
    }, 1000);

    setTimeout(() => {
        clearInterval(count);
    }, 6000);
}

// QUESTIONS AND ANSWERS
let currentQuestionIndex;
let answerCheckLength;
let twoOptions = false;
let answer;
let answer1;
let answer2;
UIsubmitButton.onclick = stopTimer;

// RESETS INDEX
function startGame(){
    currentQuestionIndex = 0;
    gameStatus = 1;
    nextQuestion();
}
 
// EVENT LISTENER
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
    if(gameStatus == 1 || answerCheckLength == 0){
        stopTimer();
    }
    }
});

// STOPWATCH
let totalTime = 0;
let timerArray = [
  { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
  { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
  { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
  { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
]

let countTimer = 0;
let startTimer = 0;
let timerUpdate = null;
let elapsedTime = 0;

function timer(){
    startTimer = Date.now() - countTimer;
    timerUpdate = setInterval(updateTimer, 10);
}

function stopTimer(){
    let answerCheck = String(UIanswerText.value);
    let answerCheck1 = String(UIanswerText1.value);
    let answerCheck2 = String(UIanswerText2.value);

   answerCheckLength = answerCheck.length 
   answerCheckLength1 = answerCheck1.length
   answerCheckLength2 = answerCheck2.length

   if(twoOptions == false){
        if (answerCheckLength == 0){
            UIquestionBox.style.backgroundColor = `#ffa05d`;
            UIsubmitButton.textContent = `please fill the answer`;
        } else{
            totalTime += timerArray[currentQuestionIndex-1];
            clearInterval(timerUpdate);
            submitAnswer();
            UIquestionBox.style.backgroundColor = `#ffe8cc`;
            UIsubmitButton.textContent = `Answer (or press the enter key)`;
        }
    } else {
        if (answerCheckLength1 == 0 || answerCheckLength2 == 0){
            UIquestionBox.style.backgroundColor = `#ffa05d`;
            UIsubmitButton.textContent = `please fill the answer`;
        } else{
            totalTime += timerArray[currentQuestionIndex-1];
            clearInterval(timerUpdate);
            submitAnswer();
            UIquestionBox.style.backgroundColor = `#ffe8cc`;
            UIsubmitButton.textContent = `Answer (or press the enter key)`;
        }
    }
}

function updateTimer(){
    const currentTime = Date.now();
    elapsedTime = currentTime - startTimer;

    let seconds = Math.floor(elapsedTime / 1000);
    let milliseconds = Math.floor(elapsedTime % 1000 / 10);

    timerArray[currentQuestionIndex-1] = seconds*100 + milliseconds;
}

// NEXT QUESTION
function nextQuestion(){
    currentQuestionIndex++;
    let questionFunctions = [
        question1, question2, question3, question4, question5,
        question6, question7, question8, question9, question10,
        question11, question12, question13, question14, question15,
        question16, question17, question18, question19, question20
    ];

    if (currentQuestionIndex <= questionFunctions.length) {
        questionFunctions[currentQuestionIndex - 1]();
        timer();
        if (currentQuestionIndex <= 17){
            UIanswerText.value = ``;
            UIanswerText.focus();
        } else{
            UIanswerText1.value = ``;
            UIanswerText2.value = ``;
            UIanswerText1.focus();
        }
        UIprogress.textContent = `Question: ${currentQuestionIndex}/20`;
    } else if(currentQuestionIndex > questionFunctions.length){
        gameStatus = false;
        ending();
    }
}

let incorrect = [];

// SUBMIT THE ANSWER
function submitAnswer(){
    if (twoOptions == false){
        let answerSubmitted = UIanswerText.value;
        if (answer == answerSubmitted){
            addScore();
            nextQuestion();
        } else{
            incorrect.push(currentQuestionIndex);
            nextQuestion();
        }
    } else{
        let answerSubmitted1 = UIanswerText1.value;
        let answerSubmitted2 = UIanswerText2.value;
        if (answer1 == answerSubmitted1 && answer2 == answerSubmitted2){
            addScore();
            nextQuestion();
        } else{
            incorrect.push(currentQuestionIndex);
            nextQuestion();
        }
    }
}  

// ADD SCORE
function addScore(){
    accuracyTotal += 5;

    let timeCalc = 0;
    if (timerArray[currentQuestionIndex-1] <= 500){
        timeCalc = 1;
    } else{
        timeCalc = (3000 - timerArray[currentQuestionIndex-1])/2500
    }
    scoreTotal += Math.ceil((scoreMax/(20))*(0.7 + timeCalc*0.3));
}

// QUESTIONS
function question1(){
    UIanswerText.style.display = `flex`;
    UIanswerText1.style.display = `none`;
    UIanswerText2.style.display = `none`;
    UIanswerSymbol.textContent = ``
    let a = Math.ceil(Math.random() * 8 + 1);
    let b;

    do {
        b = Math.ceil(Math.random() * 8 + 1);
    } while (b == a); 

    answer = a + b;
    UIquestionText.textContent = `${a} + ${b} =`;
}

// SINGLE DIGIT SUBTRACTION
function question2(){
    let a = Math.ceil(Math.random()*6 + 3);
    let b;

    do {
        b = Math.ceil(Math.random()*8 + 1);
    } while (a == b || a - b <= 1)

    if (a>b){
        answer = a - b;
        UIquestionText.textContent = `${a} - ${b} =`;
    }  else {
        answer = b - a
        UIquestionText.textContent = `${b} - ${a} =`;
    }
}

// DOUBLE DIGIT ADDITION
function question3(){
    let a;
    let b;

    do {
        a = Math.ceil(Math.random()*89 + 9);
    } while (a % 10 == 0) 

    do {
        b = Math.ceil(Math.random()*89 + 9);
    } 
    while (b == a || b % 10 == 0) 
    answer = a + b;
    UIquestionText.textContent = `${a} + ${b} =`;
}

// DOUBLE DIGIT SUBTRACTION (no negatives)
function question4(){
    let a = Math.ceil(Math.random()*89 + 9)
    let b;

    do {
        b = Math.ceil(Math.random()*89 + 9);
    }    
    // a cannot be the same as b, b is not divisible by 10
    // and the one's digit of a and b are not the same 
    while (b == a || b % 10 == 0 || b % 10 == a % 10 ||
        a>b ? a-b <= 10 : b-a<=10
    )

    if (a>b){
        answer = a - b;
        UIquestionText.textContent = `${a} - ${b} =`;
    }  else {
        answer = b - a;
        UIquestionText.textContent = `${b} - ${a} =`;
    }
}

function question5(){
    let a = Math.ceil(Math.random()*8 + 1);
    let b;

    do {
        b = Math.ceil(Math.random()*8 + 1);
    } while (b == a)
    
    answer = a*b
    UIquestionText.textContent = `${a} × ${b} =` 
}

function question6(){
    let a = Math.ceil(Math.random()*8 + 1);
    let b;

    do {
        b = Math.ceil(Math.random()*8 + 1);
    } while (b == a)
    
    let c = a*b;
    answer = a;
    UIquestionText.textContent = `${c} ÷ ${b} =`
}

function question7(){
    let a = Math.ceil(Math.random()*8 + 10);
    let b;

    do {
        b = Math.ceil(Math.random()*8 + 10);
    } while (b == a);

    answer = a*b;
    UIquestionText.textContent = `${a} × ${b} =`
}

function question8(){
    // a is two digit
    let a = Math.ceil(Math.random()*8 + 11); 
    let b;
    let c;

    // b is one digit, c must be three digit
    do {
        b = Math.ceil(Math.random()*8 + 1);
        c = a*b
    } while (c<100);

    answer = b
    UIquestionText.textContent = `${c} ÷ ${a} =`
}

function question9(){
    // get 4 variables, cannot be the same
    let a = Math.ceil(Math.random()*20);
    let b;
    let c;
    let d;
    
    do{
        b = Math.ceil(Math.random()*20);
    } while (b == a);
    do {
        c = Math.ceil(Math.random()*20);
    } while (c == a || c == b)
    do {
        d = Math.ceil(Math.random()*20);
    } while (d == a || d == b || d == c)

    let random = Math.ceil(Math.random()*10);
    if(random <= 5){
        answer = a + b - c + d;
        UIquestionText.textContent = `${a} + ${b} - ${c} + ${d} =`
    } else{
        answer = a - b + c - d;
        UIquestionText.textContent = `${a} - ${b} + ${c} - ${d} =`
    }
}

function question10(){
    // generate 4 numbers again (b and c is less than 10, more than 2 for easier calculation)
    let a = Math.ceil(Math.random()*20);
    let b;
    let c;
    let d;
    
    do{
        b = Math.ceil(Math.random()*4 + 1);
    } while (b == a);
    do {
        c = Math.ceil(Math.random()*4 + 1);
    } while (c == a || c == b);
    do {
        d = Math.ceil(Math.random()*20);
    } while (d == a || d == b || d == c);

    let random = Math.ceil(Math.random()*10);
    if(random <= 0){
        answer = a + b * c - d;
        UIquestionText.textContent = `${a} + ${b} × ${c} - ${d} =`
    } else{
        answer = a - b * c + d;
        UIquestionText.textContent = `${a} - ${b} × ${c} + ${d} =`
    }
}

function question11(){
    // generate 3 numbers first ()
    let a = Math.ceil(Math.random()*8 + 1);
    let b = Math.ceil(Math.random()*8 + 1);
    let c;
    c = a*b // c is the dividend, b is the divisor

    // generate 2 numbers from 1-20, both cannot be the same 
    let d = Math.ceil(Math.random()*20);
    let e;
    do{
        e = Math.ceil(Math.random()*20);
    } while (e == d);

    let random = Math.ceil(Math.random()*10)
    if (random <=5){
        answer = d + c / b - e;
        UIquestionText.textContent = `${d} + ${c} ÷ ${b} - ${e} =`;
    } else{
        answer = d - c / b + e;
        UIquestionText.textContent = `${d} - ${c} ÷ ${b} + ${e} =`;
    }
}

function question12(){
    // generate 2 random numbers
    let a;
    do{
        a = Math.ceil(Math.random()*9)*10; 
    } while (a == 10 || a == 50)

    let b;
    do{
        b = Math.ceil(Math.random()*9)*20 + 100;
    } while (b == 200);

    answer = a/100 * b;
    UIquestionText.textContent = `Evaluate! ${a}% of ${b}`
}

function question13(){
    let a;
        do{
            a = Math.ceil(Math.random()*39)*2 + 10; 
        } while (a%5 == 0)
            
    let b;
    b = Math.ceil(Math.random()*3)*100 + 100;

    answer = Math.round(a/100 * b);
    UIquestionText.textContent = `Evaluate! ${a}% of ${b}`
}

function question14(){
    let a = Math.ceil(Math.random()*8 + 1);
    let b;
    do{
        b = Math.ceil(Math.random()*19) + 1; 
    } while (a == b);

    let random = Math.ceil(Math.random()*10)
    if (random <=5){
        answer = b - a;
        UIquestionText.textContent = `Solve for x, x + ${a} = ${b}`;
    } else{
        answer = b + a;
        UIquestionText.textContent = `Solve for x, x - ${a} = ${b}`;
    }
}

function question15(){
    let a = Math.ceil(Math.random()*4 + 1);
    let b = Math.ceil(Math.random()*9 + 10);
    let c = Math.ceil(Math.random()*8 + 1);
    let d = a*c

    let random = Math.ceil(Math.random()*10)
    if (random <=5){
        answer = d/a - b;
        UIquestionText.textContent = `Solve for x, ${a}(x + ${b}) = ${d}`;
    } else{
        answer = d/a + b;
        UIquestionText.textContent = `Solve for x, ${a}(x - ${b}) = ${d}`;
    }
}

function question16(){
    let a = Math.ceil(Math.random()*8 + 1);
    let b;

    do{
        b = Math.ceil(Math.random()*8 + 1);
    } while (a == b)
    let c = Math.pow(a,2);
    let d = Math.pow(b,2);

    answer = c - d;
    UIquestionText.textContent = `${a}² - ${b}² =`;
}

function question17(){
    let a = Math.ceil(Math.random()*8 + 1);
    let b;

    do{
        b = Math.ceil(Math.random()*8 + 1);
    } while (a == b)
    let c = Math.pow(a,2);
    let d = Math.pow(b,2);

    let random = Math.ceil(Math.random()*10)
    if (random <=5){
        answer = a + b;
        UIquestionText.textContent = `√${c} + √${d} =`;
    } else{
        answer = a - b;
        UIquestionText.textContent = `√${c} - √${d} =`;
    }
}

function gcd(x, y) {
    if (y === 0) {
        return x;
    }
    return gcd(y, x % y);
}

function question18(){
    UIanswerText.style.display = `none`;
    UIanswerText1.style.display = `flex`;
    UIanswerText2.style.display = `flex`;
    UIanswerSymbol.textContent = `:`;
    twoOptions = true;

    let a = Math.ceil(Math.random()*8 + 1);
    let b;

    do{
        b = Math.ceil(Math.random()*8 + 1);
    } while (a == b || a % b == 0)

    let c = Math.ceil(Math.random()*4 + 1);
    let d = a*c;
    let e = b*c;

    let commonDivisor = gcd(d, e);
    let num1 = d/commonDivisor;
    let num2 = e/commonDivisor;

    answer1 = num1;
    answer2 = num2;
    UIquestionText.textContent = `Simplify the ratio, ${d} : ${e}`;
}

function question19(){
    UIanswerSymbol.textContent = `/`;

    let a = Math.ceil(Math.random()*8 + 1);
    let b;

    do{
        b = Math.ceil(Math.random()*8 + 1);
    } while (a == b || a % b == 0)
    
    let c = a+b; 
    let d = a*b;

    let commonDivisor = gcd(c, d);
    let numerator = c/commonDivisor;
    let denominator = d/commonDivisor;

    answer1 = numerator;
    answer2 = denominator;
    UIquestionText.textContent = `Simplify! 1/${a} + 1/${b}`;
}

function question20(){
    let a = Math.ceil(Math.random()*8 + 1);
    let b;
    let c = Math.ceil(Math.random()*8 + 1); ;
    let d;

    do{
        b = Math.ceil(Math.random()*4 + 1);
    } while (a % b == 0);

    do{
        d = Math.ceil(Math.random()*4 + 1);
    } while (c % d == 0 || b == d);

    let e = a*d + b*c;
    let f = b*d;
    let commonDivisor = gcd(e, f);
    let numerator = e/commonDivisor;
    let denominator = f/commonDivisor;

    answer1 = numerator;
    answer2 = denominator;
    UIquestionText.textContent = `Simplify! ${a}/${b} + ${c}/${d}`;
}

const container4 = document.getElementById(`container-4`);
const resultName = document.getElementById(`result-info-name`);
const resultClass = document.getElementById(`result-info-class`);
const resultAccuracy = document.getElementById(`result-accuracy-result`);
const resultScore = document.getElementById(`result-score-result`);

// STOP THE GAME
function ending(){
    gameStatus = 0;
    headingText3.textContent = ``;
    UIanswerBox.style.display = `none`;
    heading2.style.top = `1000px`;
    container3.style.top = `1000px`;
    container4.style.top = `-410px`;
    heading1.style.display = `block`;
    if (scoreTotal == scoreMax){
        console.log(`you did it :D`);
        document.body.style.backgroundColor = `#b3ffd0`;
        headingText1.textContent = `CONGRATULATIONS!`;
        headingText2.textContent = `YOU GOT A PERFECT SCORE 🎉`;
    } else if(scoreTotal <= 0){
        document.body.style.backgroundColor = `#ffacac`;
        headingText1.textContent = `im sorry 😔😔`;
        headingText2.textContent = `you can do better next time`;
    } else if(accuracyTotal == 100){
        document.body.style.backgroundColor = `#acdbff`;
        headingText1.textContent = `congrats!`;
        headingText2.textContent = `you got a perfect accuracy!`;
    }else{
        headingText1.textContent = `thank you for playing!`;
        headingText2.textContent = `here are your results:`;
    }
    finalSetUp();
}

const incorrectQuestionText = document.getElementById(`incorrect-question`);

let incorrectArray = ""
// SET UP THE FINAL LAYOUT
function finalSetUp(){
    resultName.textContent = `Name: ${userName}`;
    resultClass.textContent = `Class: ${className}`;
    resultAccuracy.textContent = `${accuracyTotal}%`;
    resultScore.textContent = `${scoreTotal}`;

    incorrectArray = incorrect.toString();
    if (accuracyTotal == 100){
        incorrectQuestionText.textContent = `Incorrect Number(s): None`;
    } else{
        incorrectQuestionText.textContent = `Incorrect Number(s): ${incorrectArray}`;
    }
}

// RETURN
const returnButton = document.getElementById(`return`);
returnButton.onclick = returnGame;

function returnGame(){
    userName = ``;
    className = ``;
    scoreTotal = 0;
    accuracyTotal = 0;
    gameStatus = 0;
    incorrect = [];

    currentQuestionIndex = 1;
    nameValue.value = ``;
    classValue[0].selected = true;
    headingText1.textContent = `mental math game :D`;
    headingText2.textContent = `welcome back!`;
    headingText3.textContent = `fill out your name and class below`;
    idPage.style.display = `block`
    container.style.display = `block`;
    container2.style.display = `flex`;
    nextButton.style.display = `inline`;
    proceedButton.style.display = `none`;
    heading2.style.top = `-1000px`;
    container3.style.top = `-1500px`;
    container4.style.top = `-2000px`;
    UIsubmitBox.style.display = `none`;
    returnButton.style.display = `none`
    document.body.style.backgroundColor = `#fbfff0`;

    totalTime = 0;
    timerArray = [
    { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
    { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
    { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
    { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 },
    ]
}

// FORMAT TIME INTO SECONDS AND MILLISECONDS
function formatTime(number) {
    const str = number.toString();
    const seconds = str.slice(0, -2) || "0"; // Use "0" if no seconds part
    const milliseconds = String(Number(str.slice(-2)) * 10);
    return `${seconds}s ${milliseconds}ms`;
}

const dataConfirmationText = document.getElementById(`data-confirmation`);

// RETURN BUTTON AND CONFIRMATION
function returnCall(){
    returnButton.style.display = `flex`;
    dataConfirmationText.textContent = `Your data has been sent!`
}