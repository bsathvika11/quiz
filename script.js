const questions = [
  {
    question: "Which is the closest planet to the Sun?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Venus", correct: false },
      { text: "Mercury", correct: true },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "How many days are there in a year?",
    answers: [
      { text: "265", correct: false },
      { text: "300", correct: false },
      { text: "355", correct: false },
      { text: "365", correct: true },
    ],
  },
  {
    question: "The planet Mars is also known as what? ",
    answers: [
      { text: "The Red Planet", correct: true },
      { text: "The Green Planet", correct: false },
      { text: "The Black Planet", correct: false },
      { text: "The Blue Planet", correct: false },
    ],
  },
  {
    question: "How many months have 31 days?",
    answers: [
      { text: "9", correct: false },
      { text: "7", correct: true },
      { text: "5", correct: false },
      { text: "10", correct: false },
    ],
  },
  {
    question: "How long does it take for light from the Sun to reach Earth? ",
    answers: [
      { text: "1 minute", correct: false },
      { text: "8 minutes", correct: true },
      { text: "24 hours", correct: false },
      { text: "Instantaneous", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("options");
const nextButton = document.getElementById("next");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Your score is ${score} out of ${questions.length}`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
