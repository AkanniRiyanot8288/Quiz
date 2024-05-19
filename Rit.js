const quizData = [
  {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Markup Language", "Hyperlink Text Markup Language", "Home Tool Markup Language"],
      answer: "Hyper Text Markup Language"
  },
  {
      question: "Which technology is primarily responsible for the styling of web pages?",
      options: ["JavaScript", "HTML", "CSS", "Python"],
      answer: "CSS"
  },
  {
      question: "What does CSS stand for?",
      options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Custom Style Sheets"],
      answer: "Cascading Style Sheets"
  },
  {
      question: "Which programming language is mainly used for adding interactivity to websites?",
      options: ["JavaScript", "HTML", "CSS", "Python"],
      answer: "JavaScript"
  },
  {
      question: "Which development focuses on the server side of web applications?",
      options: ["Front-end development", "Back-end development", "Full-stack development", "Middleware development"],
      answer: "Back-end development"
  },
  { 
    question: "what is the purpose of a front-end web development framework like React or Angular?",
    options: ["manage databases and server-side logic", "To create a visually appealing user interface", "To handle server-side routing", "To interact with web servers"],
    answer: "To create a visually appealing user interface"
  },
  {
    question: "What is the primary function of a web server in the context of web development?",
    options: ["web pages on the client’s browser","Executing JavaScript code", "Storing user data", "Handling HTTP requests and serving web pages"], 
    answer: "Handling HTTP requests and serving web pages"

  },
  {
    question: "Which of the following is not a back-end programming language commonly used in web development?",
    options: ["PHP", "Ruby", "Java", "HTML"],
    answer: "HTML"
  },
  {
    question: "Which type of web development allows for both front-end and back-end development using a single language?",
    options: ["Full-stack development", "Cross-platform development", "Multi-language development", "Hybrid development"],
    answer: "Full-stack development"

  },
  {
    question: "What is the purpose of the script tag in HTML?",
    options: ["To define the page’s structure", "To include external CSS styles", "To include external JavaScript code", "To create hyperlinks"],
    answer: "To include external JavaScript code"
  },

];

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const submitButton = document.getElementById('submit-btn');
const resultElement = document.getElementById('result');

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

function loadQuestion() {
  const currentQuizData = quizData[currentQuestion];
  questionElement.innerText = currentQuizData.question;
  optionsElement.innerHTML = '';
  currentQuizData.options.forEach(option => {
      const button = document.createElement('button');
      button.innerText = option;
      button.classList.add('btn');
      button.addEventListener('click', () => checkAnswer(option));
      optionsElement.appendChild(button);
  });
}

function checkAnswer(selectedOption) {
  userAnswers[currentQuestion] = selectedOption;
  const currentQuizData = quizData[currentQuestion];
  if (selectedOption === currentQuizData.answer) {
      score++;
      resultElement.innerHTML = "<p>Correct!</p>";
  } else {
      resultElement.innerHTML = "<p>Incorrect!</p>";
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
      loadQuestion();
  } else {
      showResult();
  }
}

function showResult() {
  resultElement.innerHTML = `<h3>Your score: ${score}/${quizData.length}</h3>`;
  const reviewButton = document.createElement('button');
  reviewButton.innerText = 'Review Answers';
  reviewButton.classList.add('btn');
  reviewButton.addEventListener('click', reviewAnswers);
  resultElement.appendChild(reviewButton);

  const retakeButton = document.createElement('button');
  retakeButton.innerText = 'Retake Quiz';
  retakeButton.classList.add('btn');
  retakeButton.addEventListener('click', retakeQuiz);
  resultElement.appendChild(retakeButton);
}

function reviewAnswers() {
  resultElement.innerHTML = '';
  quizData.forEach((quiz, index) => {
      const questionReview = document.createElement('p');
      questionReview.innerHTML = `<strong>Q:</strong> ${quiz.question} <br> <strong>Your answer:</strong> ${userAnswers[index] ? userAnswers[index] : 'Not answered'} <br> <strong>Correct answer:</strong> ${quiz.answer}`;
      resultElement.appendChild(questionReview);
  });
  const retakeButton = document.createElement('button');
  retakeButton.innerText = 'Retake Quiz';
  retakeButton.classList.add('btn');
  retakeButton.addEventListener('click', retakeQuiz);
  resultElement.appendChild(retakeButton);
}

function retakeQuiz() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  resultElement.innerHTML = '';
  loadQuestion();
}

loadQuestion();