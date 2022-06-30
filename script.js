//https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple
let category=document.querySelector("#category").value; 
let medium=document.querySelector("#diffi").value;
let api_url1='https://opentdb.com/api.php?amount=10&category=';
let api_url2=category+'&difficulty=';
let api_url3=medium+'&type=multiple';
let full_url=api_url1+api_url2+api_url3;
category_fetch=document.getElementById("q-category");
_checkBtn=document.getElementById('check-answer');
const _options = document.querySelector('.q-options');
const _question=document.getElementById('q-api');
const _playAgainBtn=document.getElementById('pa');

async function get_data(){
    const response=await fetch(full_url);
    const data=await response.json();
    console.log(data)
    let cat=data.results[0].category
    category_fetch.innerHTML=cat;
    showQuestion(data.results[0]);



}
function getuserchoice(){
    document.querySelector(".container").style.display='none';
    document.querySelector(".questions").style.display='flex';
    console.log(full_url)
    get_data()

    
}
function showQuestion(data){
    _checkBtn.disabled = false;
    correctAnswer = data.correct_answer;
    let incorrectAnswer = data.incorrect_answers;
    let optionsList = incorrectAnswer;
    optionsList.splice(Math.floor(Math.random() * (incorrectAnswer.length + 1)), 0, correctAnswer);
    // console.log(correctAnswer);

    
    _question.innerHTML = `${data.question}`;
    _options.innerHTML = `
        ${optionsList.map((option, index) => `
            <li> ${index + 1}. <span>${option}</span> </li>
        `).join('')}
    `;
    selectOption();
}
function selectOption(){
    _options.querySelectorAll('li').forEach(function(option){
        option.addEventListener('click', function(){
            if(_options.querySelector('.selected')){
                const activeOption = _options.querySelector('.selected');
                activeOption.classList.remove('selected');
            }
            option.classList.add('selected');
        });
    });
}
