let correctAnswer;
// test commit from vsc
document.addEventListener('DOMContentLoaded', function () {
    loadQuestion();
    eventListners();
});

eventListners = () => {
    document.querySelector('#check-answer').addEventListener('click', validateAnswer);
}
// load question from an API
loadQuestion = () => {
    const url ='https://opentdb.com/api.php?amount=1';
    fetch(url)
        .then(data => data.json())
        .then(result => displayQuestion(result.results));
}

// displayes the questions from API
displayQuestion = questions => {
    
    // create the html question
    const questionHTML = document.createElement('div');
    questionHTML.classList.add('col-12');

    questions.forEach(question => {
        // read the correct answer 
        correctAnswer = question.correct_answer;

        // inject the correct answer in all possible answers
        let possibleAnswers = question.incorrect_answers;
        possibleAnswers.splice(Math.floor(Math.random() * 3), 0, correctAnswer);
        
        // add the html for the current question
        questionHTML.innerHTML = `
            <div class="row justify-content-between heading">
                <p class="category">Category: ${question.category}</p>
            </div>
            <h2 class="text-center">${question.question}
        `;
        // create the HTML for the answers
        const answerDiv = document.createElement('div');
        answerDiv.classList.add('questions', 'row', 'justify-content-around', 'mt-4');
        possibleAnswers.forEach(answer => {
            const answerHTML = document.createElement('li');
            answerHTML.classList.add('col-12', 'col-md-5');
            answerHTML.textContent = answer;
            // attach an event when an answer is clicked
            answerHTML.onclick = selectAnswer;
            answerDiv.appendChild(answerHTML);
        });
        questionHTML.appendChild(answerDiv);

        // render the html
        document.querySelector('#app').appendChild(questionHTML);
    });
}

// when the answer is clicked
selectAnswer = (e) => {
    //removes the previous active class for the answer
    if (document.querySelector('.active')) {
        const activeAnswer = document.querySelector('.active');
        activeAnswer.classList.remove('active');
    }
    e.target.classList.add('active');

}

// checks if the answer is correct and one answer is selected
validateAnswer = () => {
    if (document.querySelector('.questions .active')) {
        // everything is ok, check if the answer is correct
    } else {
        const errorDiv = document.createElement('div');
        errorDiv.classList.add('alert', 'alert-danger', 'col-md-6');
        errorDiv.textContent = 'Please select an answer';
        const questionsDiv = document.querySelector('.questions');
        questionsDiv.appendChild(errorDiv);

        // remove the error
        setTimeout(() => {
            document.querySelector('.alert-danger').remove();
            
        }, 1000);
    }
}