const quizData = [
  {
    question: "The capital city of Nigeria is?",
    a: "Abuja",
    b: "Port Harcourt",
    c: "Adamawa",
    d: "Lagos",
    correct: "a",
  },
  {
    question: "What is the name of  Nigeria's president?",
    a: "Goodluck Jonathan",
    b: "Bola Tinubu",
    c: "Muhammadu Buhari",
    d: "Olusegun Obasanjo",
    correct: "c",
  },
  {
    question: "What is the name of the commercial city of Nigeria?",
    a: "Adamawa",
    b: "Lagos",
    c: "Kaduna",
    d: "Enugu",
    correct: "b",
  },
  {
    question: "The name of the President of the US is?",
    a: "Donald Trump",
    b: "Hillary Clinton",
    c: "Joe Biden",
    d: "Anthony Blinken",
    correct: "c",
  },
  {
    question: "The most popular programming language in 2022 is?",
    a: "Python",
    b: "C++",
    c: "JavaScript",
    d: "Ruby",
    correct: "c",
  },
  {
    question: "The S.I unit of power is?",
    a: "Energy",
    b: "Watts",
    c: "moles",
    d: "Kilogram",
    correct: "b",
  },
  {
    question:
      "The presidential campaigns of political parties for 2023 elections in Nigeria started on?",
    a: "24 October, 2022",
    b: "15 July, 2022",
    c: "28 September, 2022",
    d: "10 June, 2022",
    correct: "c",
  },
  {
    question: "HTML stands for?",
    a: "HyperTextual Marking Lists",
    b: "Hyper Texting Marking Lists",
    c: "High Text Markup Language",
    d: "HyperText Markup Language",
    correct: "d",
  },
  {
    question: "The S.I unit of Mass is?",
    a: "Grams",
    b: "Kilograms",
    c: "moles",
    d: "Kilometers",
    correct: "a",
  },
  {
    question: "Nigeria gained her independence on?",
    a: "24 October, 1953",
    b: "24 January, 1940",
    c: "1 October, 1963",
    d: "1 October, 1960",
    correct: "d",
  },
];

const questionText = document.querySelector(".question-text");

const a_text = document.querySelector("#a_text");

const b_text = document.querySelector("#b_text");

const c_text = document.querySelector("#c_text");

const d_text = document.querySelector("#d_text");

const submit = document.querySelector(".submit");

const answerRads = document.querySelectorAll(".answer");

const quizContainer = document.querySelector(".container-quiz");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
  deSelect();
  const currentQuizData = quizData[currentQuiz];

  questionText.innerText = currentQuizData.question;

  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function getSelected() {
  let answer = undefined;
  answerRads.forEach((answerRad) => {
    if (answerRad.checked) {
      answer = answerRad.id;
    }
  });
  return answer;
}

function deSelect() {
  answerRads.forEach((answerRad) => {
    answerRad.checked = false;
  });
}

submit.addEventListener("click", function () {
  const answer = getSelected();

  if (answer) {
    if (answer === quizData[currentQuiz].correct) {
      score++;
    }

    currentQuiz++;

    if (currentQuiz < quizData.length) {
      loadQuiz();
    } else {
      quizContainer.innerHTML = `<h3>You have scored ${score} out of ${quizData.length} questions.</h3> <h4>Congratulations!</h4><button onclick="location.reload()">Refresh</button>`;
    }
  }
});
