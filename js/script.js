const questions = [
    {
        question: "What does JavaScript primarily add to a web page?",
        choices: ["Styling", "Interactivity", "Database connectivity", "Server-side processing"],
        correct: 1
    },
    {
        question: "Which of the following is not a valid JavaScript data type?",
        choices: ["String", "Boolean", "Float", "Character"],
        correct: 2
    },
    {
        question: "What keyword is used to declare a variable in JavaScript?",
        choices: ["var", "let", "const", "variable"],
        correct: 0
    },
    {
        question: "What is the result of the expression 3 + '3' in JavaScript?",
        choices: ["6", "33", "error", "9"],
        correct: 1
    },
    {
        question: "Which method is used to add an item to the end of an array?",
        choices: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0
    },
    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        choices: ["//", "/*", "#", "--"],
        correct: 0
    },
    {
        question: "How do you round the number 7.25 to the nearest integer in JavaScript?",
        choices: ["round(7.25)", "Math.round(7.25)", "Math.rnd(7.25)", "rnd(7.25)"],
        correct: 1
    },
    {
        question: "What is the correct way to write a JavaScript array?",
        choices: ["[1, 2, 3]", "1, 2, 3", "{1, 2, 3}", "array(1, 2, 3)"],
        correct: 0
    },
    {
        question: "What is the result of the expression 'Hello' + 'World' in JavaScript?",
        choices: ["'HelloWorld'", "'Hello World'", "error", "'Hello' 'World'"],
        correct: 1
    },
    {
        question: "How do you declare a function in JavaScript?",
        choices: ["function = myFunction()", "function myFunction()", "myFunction(): function", "declare function myFunction()"],
        correct: 1
    },
    {
        question: "Which of the following is not a JavaScript framework or library?",
        choices: ["React", "Angular", "Vue", "JavaFX"],
        correct: 3
    },
    {
        question: "How do you check if a variable is undefined in JavaScript?",
        choices: ["if (variable == null)", "if (variable === undefined)", "if (typeof variable === 'undefined')", "if (variable == undefined)"],
        correct: 2
    },
    {
        question: "What does the 'this' keyword refer to in JavaScript?",
        choices: ["The current function", "The global object", "The previous object", "The parent object"],
        correct: 0
    },
    {
        question: "Which method is used to remove the last item from an array in JavaScript?",
        choices: ["pop()", "push()", "shift()", "unshift()"],
        correct: 0
    },
    {
        question: "What is the result of the expression 5 === '5' in JavaScript?",
        choices: ["true", "false", "error", "undefined"],
        correct: 1
    },
    {
        question: "What is the purpose of the 'JSON.parse()' method in JavaScript?",
        choices: ["To parse HTML", "To parse JavaScript code", "To parse JSON data", "To parse CSS"],
        correct: 2
    },
    {
        question: "Which of the following is not a valid JavaScript loop?",
        choices: ["for", "while", "loop", "do...while"],
        correct: 2
    },
    {
        question: "What is the JavaScript operator for calculating the remainder of a division?",
        choices: ["%", "&", "/", "remainder()"],
        correct: 0
    },
    {
        question: "How do you add a comment in JavaScript?",
        choices: ["// This is a comment", "/* This is a comment */", "# This is a comment", "' This is a comment"],
        correct: 0
    },
    {
        question: "Which of the following is not a JavaScript data type?",
        choices: ["Number", "Undefined", "Boolean", "Float"],
        correct: 3
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 60;

const startButton = document.getElementById("startButton");
const quizDiv = document.getElementById("quiz");
const questionDiv = document.getElementById("question");
const choicesDiv = document.getElementById("choices");
const nextButton = document.getElementById("nextButton");
const timerSpan = document.getElementById("timer");
const resultDiv = document.getElementById("result");
const scoreSpan = document.getElementById("score");
const initialsInput = document.getElementById("initials");
const saveButton = document.getElementById("saveButton");
const leaderboardDiv = document.getElementById("leaderboard");
const scoreList = document.getElementById("scoreList");
const notificationElement = document.getElementById("notification");
const notificationContainer = document.getElementById("notificationContainer");
const answerNotificationDiv = document.getElementById("answerNotification");
const answerText = document.getElementById("answerText");

startButton.addEventListener("click", startQuiz);
nextButton.addEventListener("click", nextQuestion);
saveButton.addEventListener("click", saveScore);

function startQuiz() {
    startButton.style.display = "none";
    quizDiv.style.display = "block";
    timer = setInterval(updateTimer, 1000);
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionDiv.textContent = question.question;
    choicesDiv.innerHTML = "";
    notificationElement.textContent = "";

    question.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button");
        choiceButton.textContent = choice;
        choiceButton.addEventListener("click", () => selectAnswer(index));
        choicesDiv.appendChild(choiceButton);
    });

    questionDiv.style.padding = "10px";
    choicesDiv.classList.add("centered-choices");
}

function selectAnswer(selectedIndex) {
    const question = questions[currentQuestion];

    const choiceButtons = choicesDiv.querySelectorAll("button");
    choiceButtons.forEach(button => button.disabled = true);

    if (selectedIndex !== question.correct) {
        timeLeft -= 5;
        timeLeft = Math.max(0, timeLeft);
        displayAnswerNotification("Wrong answer! -5 seconds");
    } else {
        score++;
        displayAnswerNotification("Correct!");
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function updateTimer() {
    timeLeft--;
    timerSpan.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    quizDiv.style.display = "none";
    resultDiv.style.display = "block";
    scoreSpan.textContent = score;
    leaderboardDiv.style.display = "block";
}

function saveScore() {
    const initials = initialsInput.value;
    if (initials) {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push({ initials, score });
        highScores.sort((a, b) => b.score - a.score);
        localStorage.setItem("highScores", JSON.stringify(highScores));
        displayLeaderboard();
    }
}

function displayLeaderboard() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    scoreList.innerHTML = "";
    highScores.slice(0, 10).forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.initials}: ${entry.score}`;
        scoreList.appendChild(li);
    });
}

function displayAnswerNotification(message) {
    answerText.textContent = message;
    answerNotificationDiv.style.display = "block";
}

displayLeaderboard();
