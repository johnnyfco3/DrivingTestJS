const question = document.querySelector('#question')
const choices = Array.from(document.querySelectorAll('.choice-answer'))
const progressText = document.querySelector('#question-format')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')

let currentQuestion = {}
let questionCount = 0
let acceptingQuestions = true
let score = 0
let availableQuestions = []

let questions = [
    {
        question: 'The safest speed to drive your car:',
        choice1: 'Is the posted speed limit',
        choice2: 'Is lower than the posted speed limit',
        choice3: 'Depends on the weather and road conditions',
        choice4: 'Depends on the mechanical skill of the driver',
        answer: '3'
    },
    {
        question: 'Assuming that the street is level, what should you do after you have finished parallel parking in a space between two other cars?',
        choice1: 'Leave your front wheels turned toward the curb',
        choice2: 'Make sure your car almost touches the car behind you',
        choice3: 'Move as far forward in the space as possible',
        choice4: 'Straighten your front wheels and leave room between cars',
        answer: '4'
    },
    {
        question: 'The car behind you begins to pass you. You should:',
        choice1: 'Maintain your speed so traffic will flow smoothly',
        choice2: 'Pull to the right and stop so it can pass',
        choice3: 'Slow down slightly and stay in your lane',
        choice4: 'Blow your horn to signal that it to pass',
        answer: '3'
    },
    {
        question: 'Blood alcohol content (BAC) depends on each of the following, except:',
        choice1: 'Your body weight',
        choice2: 'How much you drink',
        choice3: 'How much time passes between drinks',
        choice4: 'How physically fit you are',
        answer: '4'
    },
    {
        question: 'A broken yellow centerline means that:',
        choice1: 'Passing is not permitted',
        choice2: 'Passing on the right is permitted when the way ahead is clear',
        choice3: 'Passing on the left is permitted when the way ahead is clear',
        choice4: 'None of the above',
        answer: '3'
    },
]

const SCORE_POINTS = 10;
const MAX_QUESTION = 5;

startGame = () =>{
    questionCount = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () =>{
    if(availableQuestions.length === 0 ||  questionCount > MAX_QUESTION){
        localStorage.setItem('Recentscore', score)
        return window.location.assign('/end.html')
    }
    questionCount++;
    progressText.innerText = `Question ${questionCount} of ${MAX_QUESTION}`
    progressBarFull.style.width = `${(questionCount/MAX_QUESTION) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice =>{
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionIndex, 1)

    acceptingQuestions = true
}

choices.forEach(choice=>{
    choice.addEventListener('click', e =>{
        if(!acceptingQuestions) return;
        acceptingQuestions = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct'){
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num =>{
    score += num
    scoreText.innerText = score
}

startGame()