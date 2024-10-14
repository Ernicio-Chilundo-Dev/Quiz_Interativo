const questions = [
    {
        question: "Qual é a capital do Brasil?",
        answers: [
            { text: "Rio de Janeiro", correct: false },
            { text: "Brasília", correct: true },
            { text: "São Paulo", correct: false },
            { text: "Salvador", correct: false }
        ]
    },
    {
        question: "Qual é a cor do céu em um dia ensolarado?",
        answers: [
            { text: "Verde", correct: false },
            { text: "Azul", correct: true },
            { text: "Roxo", correct: false },
            { text: "Amarelo", correct: false }
        ]
    },
    {
        question: "Quantos continentes existem?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.classList.add('hide');
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextButton.classList.add('hide');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
    }
    scoreElement.innerText = `Pontuação: ${score}`;
    Array.from(answerButtonsElement.children).forEach(button => {
        button.disabled = true;
        button.classList.add(button.innerText === answer.text ? (correct ? 'correct' : 'wrong') : 'answer-btn');
    });
    nextButton.classList.remove('hide');
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert('Quiz finalizado!');
        startQuiz();
    }
}

nextButton.addEventListener('click', showNextQuestion);

startQuiz();
