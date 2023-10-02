// Define an array of quiz questions.
const questions = [
    {
        // Question 1
        question: "What does JavaScript primarily add to a web page?",
        choices: ["Styling", "Interactivity", "Database connectivity", "Server-side processing"],
        correct: 1 // The correct answer is the second choice ("Interactivity").
    },
    {
        // Question 2
        question: "Which of the following is not a valid JavaScript data type?",
        choices: ["String", "Boolean", "Float", "Character"],
        correct: 2 // The correct answer is the third choice ("Float").
    },
    {
        // Question 3
        question: "What keyword is used to declare a variable in JavaScript?",
        choices: ["var", "let", "const", "variable"],
        correct: 0 // The correct answer is the first choice ("var").
    },
    {
        // Question 4
        question: "What is the result of the expression 3 + '3' in JavaScript?",
        choices: ["6", "33", "error", "9"],
        correct: 1 // The correct answer is the second choice ("33").
    },
    {
        // Question 5
        question: "Which method is used to add an item to the end of an array?",
        choices: ["push()", "pop()", "shift()", "unshift()"],
        correct: 0 // The correct answer is the first choice ("push()").
    },
    {
        // Question 6
        question: "Which symbol is used for single-line comments in JavaScript?",
        choices: ["//", "/*", "#", "--"],
        correct: 0 // The correct answer is the first choice ("//").
    },
    {
        // Question 7
        question: "How do you round the number 7.25 to the nearest integer in JavaScript?",
        choices: ["round(7.25)", "Math.round(7.25)", "Math.rnd(7.25)", "rnd(7.25)"],
        correct: 1 // The correct answer is the second choice ("Math.round(7.25)").
    },
    {
        // Question 8
        question: "What is the correct way to write a JavaScript array?",
        choices: ["[1, 2, 3]", "1, 2, 3", "{1, 2, 3}", "array(1, 2, 3)"],
        correct: 0 // The correct answer is the first choice ("[1, 2, 3]").
    },
    {
        // Question 9
        question: "What is the result of the expression 'Hello' + 'World' in JavaScript?",
        choices: ["'HelloWorld'", "'Hello World'", "error", "'Hello' 'World'"],
        correct: 1 // The correct answer is the second choice ("'Hello World'").
    },
    {
        // Question 10
        question: "How do you declare a function in JavaScript?",
        choices: ["function = myFunction()", "function myFunction()", "myFunction(): function", "declare function myFunction()"],
        correct: 1 // The correct answer is the second choice ("function myFunction()").
    },
    {
        // Question 11
        question: "Which of the following is not a JavaScript framework or library?",
        choices: ["React", "Angular", "Vue", "JavaFX"],
        correct: 3 // The correct answer is the fourth choice ("JavaFX").
    },
    {
        // Question 12
        question: "How do you check if a variable is undefined in JavaScript?",
        choices: ["if (variable == null)", "if (variable === undefined)", "if (typeof variable === 'undefined')", "if (variable == undefined)"],
        correct: 2 // The correct answer is the third choice ("if (typeof variable === 'undefined')").
    },
    {
        // Question 13
        question: "What does the 'this' keyword refer to in JavaScript?",
        choices: ["The current function", "The global object", "The previous object", "The parent object"],
        correct: 0 // The correct answer is the first choice ("The current function").
    },
    {
        // Question 14
        question: "Which method is used to remove the last item from an array in JavaScript?",
        choices: ["pop()", "push()", "shift()", "unshift()"],
        correct: 0 // The correct answer is the first choice ("pop()").
    },
    {
        // Question 15
        question: "What is the result of the expression 5 === '5' in JavaScript?",
        choices: ["true", "false", "error", "undefined"],
        correct: 1 // The correct answer is the second choice ("false").
    },
    {
        // Question 16
        question: "What is the purpose of the 'JSON.parse()' method in JavaScript?",
        choices: ["To parse HTML", "To parse JavaScript code", "To parse JSON data", "To parse CSS"],
        correct: 2 // The correct answer is the third choice ("To parse JSON data").
    },
    {
        // Question 17
        question: "Which of the following is not a valid JavaScript loop?",
        choices: ["for", "while", "loop", "do...while"],
        correct: 2 // The correct answer is the third choice ("loop").
    },
    {
        // Question 18
        question: "What is the JavaScript operator for calculating the remainder of a division?",
        choices: ["%", "&", "/", "remainder()"],
        correct: 0 // The correct answer is the first choice ("%").
    },
    {
        // Question 19
        question: "How do you add a comment in JavaScript?",
        choices: ["// This is a comment", "/* This is a comment */", "# This is a comment", "' This is a comment"],
        correct: 0 // The correct answer is the first choice ("// This is a comment").
    },
    {
        // Question 20
        question: "Which of the following is not a JavaScript data type?",
        choices: ["Number", "Undefined", "Boolean", "Float"],
        correct: 3 // The correct answer is the fourth choice ("Float").
    }
];

let currentQuestion = 0; // Index of the current question
let score = 0; // User's score
let timer; // Timer for the quiz
let timeLeft = 120; // Initial time left for the quiz

const startButton = document.getElementById("startButton"); // Button to start the quiz
const quizDiv = document.getElementById("quiz"); // Container for quiz questions
const questionDiv = document.getElementById("question"); // Element to display the question
const choicesDiv = document.getElementById("choices"); // Container for answer choices
const nextButton = document.getElementById("nextButton"); // Button to move to the next question
const timerSpan = document.getElementById("timer"); // Element to display the timer
const resultDiv = document.getElementById("result"); // Container for displaying the result
const scoreSpan = document.getElementById("score"); // Element to display the user's score
const initialsInput = document.getElementById("initials"); // Input for user initials
const saveButton = document.getElementById("saveButton"); // Button to save the score
const leaderboardDiv = document.getElementById("leaderboard"); // Container for displaying the leaderboard
const scoreList = document.getElementById("scoreList"); // List to display high scores
const notificationElement = document.getElementById("notification"); // Element for notifications
const notificationContainer = document.getElementById("notificationContainer"); // Container for notifications
const answerNotificationDiv = document.getElementById("answerNotification"); // Container for answer-related notifications
const answerText = document.getElementById("answerText"); // Element to display answer-related notifications

startButton.addEventListener("click", startQuiz); // Event listener for starting the quiz
nextButton.addEventListener("click", nextQuestion); // Event listener for moving to the next question
saveButton.addEventListener("click", saveScore); // Event listener for saving the score

// Function to start the quiz
function startQuiz() {
    startButton.style.display = "none"; // Hide the start button
    quizDiv.style.display = "block"; // Show the quiz container
    timer = setInterval(updateTimer, 1000); // Start the timer
    showQuestion(); // Display the first question
}

// Function to display a question
function showQuestion() {
    const question = questions[currentQuestion]; // Get the current question
    questionDiv.textContent = question.question; // Display the question
    choicesDiv.innerHTML = ""; // Clear previous answer choices
    notificationElement.textContent = ""; // Clear any previous notifications

    question.choices.forEach((choice, index) => {
        const choiceButton = document.createElement("button"); // Create a button for each choice
        choiceButton.textContent = choice; // Set the choice text
        choiceButton.addEventListener("click", () => selectAnswer(index)); // Add an event listener for selecting the answer
        choicesDiv.appendChild(choiceButton); // Add the choice button to the container
    });

    questionDiv.style.padding = "10px"; // Add padding for the question
    choicesDiv.classList.add("centered-choices"); // Apply styling for centered choices
}

// Function to handle answer selection
function selectAnswer(selectedIndex) {
    const question = questions[currentQuestion]; // Get the current question

    const choiceButtons = choicesDiv.querySelectorAll("button"); // Get all choice buttons
    choiceButtons.forEach(button => button.disabled = true); // Disable choice buttons to prevent further clicks

    if (selectedIndex !== question.correct) {
        timeLeft -= 5; // Subtract time for a wrong answer
        timeLeft = Math.max(0, timeLeft); // Ensure timeLeft doesn't go negative
        displayAnswerNotification("Wrong answer! -5 seconds"); // Display a notification for incorrect answers
    } else {
        score++; // Increment the score for a correct answer
        displayAnswerNotification("Correct!"); // Display a notification for correct answers
    }

    currentQuestion++; // Move to the next question

    if (currentQuestion < questions.length) {
        showQuestion(); // Display the next question
    } else {
        endQuiz(); // End the quiz if all questions are answered
    }
}

// Function to move to the next question
function nextQuestion() {
    currentQuestion++; // Move to the next question
    if (currentQuestion < questions.length) {
        showQuestion(); // Display the next question
    } else {
        endQuiz(); // End the quiz if all questions are answered
    }
}

// Function to update the timer
function updateTimer() {
    timeLeft--; // Decrement the time remaining
    timerSpan.textContent = timeLeft; // Display the updated time

    if (timeLeft <= 0) { // Check if time is up
        clearInterval(timer); // Stop the timer
        endQuiz(); // End the quiz
    }
}

// Function to end the quiz
function endQuiz() {
    clearInterval(timer); // Stop the timer
    quizDiv.style.display = "none"; // Hide the quiz container
    resultDiv.style.display = "block"; // Show the result container
    scoreSpan.textContent = score; // Display the user's score
    leaderboardDiv.style.display = "block"; // Show the leaderboard
}

// Function to save the user's score
function saveScore() {
    const initials = initialsInput.value; // Get user's initials
    if (initials) {
        const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // Get high scores from local storage
        highScores.push({ initials, score }); // Add the new score
        highScores.sort((a, b) => b.score - a.score); // Sort high scores by score
        localStorage.setItem("highScores", JSON.stringify(highScores)); // Save high scores in local storage
        displayLeaderboard(); // Display the updated leaderboard
    }
}

// Function to display the leaderboard
function displayLeaderboard() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || []; // Get high scores from local storage
    scoreList.innerHTML = ""; // Clear previous leaderboard entries
    highScores.slice(0, 10).forEach(entry => {
        const li = document.createElement("li"); // Create a list item for each entry
        li.textContent = `${entry.initials}: ${entry.score}`; // Display initials and score
        scoreList.appendChild(li); // Add the entry to the leaderboard
    });
}

// Function to display answer-related notifications
function displayAnswerNotification(message) {
    answerText.textContent = message; // Display the notification message
    answerNotificationDiv.style.display = "block"; // Show the answer notification
}

// Display the leaderboard when the page loads
displayLeaderboard();
