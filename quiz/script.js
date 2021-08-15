// Initial data

let currentQuestionPosition = 0;
let correntAnswers = 0;

showQuestion();

// Events

document.querySelector('.scoreArea button').addEventListener('click', resetEvent);

// Functions

function showQuestion() {
    if (questions[currentQuestionPosition]) {
        let currentQuestion = questions[currentQuestionPosition];

        let percent = Math.floor((currentQuestionPosition / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${percent}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = currentQuestion.question;
        let optionsHtml = '';
        for (let indice in currentQuestion.options) {
            optionsHtml += `<div data-option="${indice}" class="option"><span>${parseInt(indice) + 1}</span>${currentQuestion.options[indice]}</div>`;
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item => {
            item.addEventListener('click', optionClickEvent);
        });
    } else {
        finishQuiz();
    }
}

function optionClickEvent(event) {
    let clickedOption = parseInt(event.target.getAttribute('data-option'));

    if (questions[currentQuestionPosition].answer == clickedOption) {
        correntAnswers++;
    }

    currentQuestionPosition++;
    showQuestion();
}

function finishQuiz() {

    let points = Math.floor((correntAnswers / questions.length) * 100);

    if (points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Tá ruim, eihn?!';
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom!';
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if (points >= 70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns!';
        document.querySelector('.scorePct').style.color = '#0D630D';
    }

    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Você respondeu ${questions.length} questões e acertou ${correntAnswers}.`;

    document.querySelector('.progress--bar').style.width = '100%';
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
}

function resetEvent() {
    correntAnswers = 0;
    currentQuestionPosition = 0;
    showQuestion();
}