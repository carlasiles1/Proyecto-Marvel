<style scoped>
.quiz {
    background-color: #191129;
    justify-content: center;
    align-items: center;
    margin: -0.5rem;
    height: 100vh;
}
.quiz_screen{
    display: flex;
    justify-content: center;
}
.quiz__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.quiz__title {
    color: #ca1a1a;
    text-align: center;
    width: 30%;
    margin: 0;
    padding-top: 6rem;
}
.quiz_screen{
    display: flex;
}
.quiz__question-text {
    font-size: 2rem;
    color: rgb(206, 178, 21);
}
.quiz__label {
    display: block;
    color: white;
    margin: 1rem 0;
}
.quiz__label::after {
    background-color: #007BFF;
}
.quiz__input {
    margin-right: 1rem;
}   
.quiz__navigation{
    display: flex;
    align-items: center;
    color: #e62429;
}
.quiz__button {
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
    width: 5rem;
    height: 2rem;
    border-radius: 2rem 0;
    transition: 0.3s;
    margin: 0 4rem;
}
.quiz__button:hover {
    background-color: #e62429;
}
.quiz__image {
    width: 22rem;
    margin-left: 8rem;
}
.pointer{
    position: absolute;
    width: 3rem;
    transform: rotateZ(-35Deg) translate(2.5rem, 1rem);
}
</style>

<template>
    <main class="quiz">
        <h1 class="quiz__title">Avengers Comics Quiz</h1>
        <div class="quiz_screen">
            <form class="quiz__form" id="quizForm">
                <div v-if="randomQuestions.length" class="quiz__question">
                    <p class="quiz__question-text">{{ randomQuestions[currentQuestion].question }}</p>
                    <label v-for="option in randomQuestions[currentQuestion].options " 
                        :key="option" 
                        class="quiz__label">
                        <input type="radio" 
                            :name="'q' + currentQuestion" 
                            :value="option" 
                            v-model="userAnswers[currentQuestion]">
                        {{ option }}
                        <img v-if="userAnswers[currentQuestion] === option" 
                            :src="source" 
                            alt="" 
                            class="pointer">
                </label>
                </div>
                <div class="quiz__navigation">
                    <button @click="prev" class="quiz__button quiz__button--prev" type="button">Prev</button>
                    <p>{{ page }} / 15</p>
                    <button @click="next" class="quiz__button quiz__button--next" type="button">Next</button>
                </div>
            </form>
            <img class="quiz__image" src="@/assets/img/theWatcher.png" alt="The Watcher">
        </div>
    </main>
</template>

<script setup>
import {ref, onMounted} from 'vue'

const quiz = ref({})
const randomQuestions = ref([])
const currentQuestion = ref(0)
const userAnswers = ref({})
const score = ref(0)
const source = ref('')

const page = ref('')
page.value = 1


const selected = new Set()

const fetchQuiz = async () => {
        try {
            const response = await fetch('/quiz.json')
            if (!response.ok) {
                throw new Error('Error loading data')
            }
            const data = await response.json()
            quiz.value = data
        } catch (error) {
            console.error('Error loading data', error)
        }

        source.value = new URL ('@/assets/img/ironPointer.png', import.meta.url).href

        getRandomQuestions()
    }
onMounted(fetchQuiz)

const getRandomQuestions = ()=>{
    const total = quiz.value.questions.length

    while(selected.size < 15){
        const randomIndex = Math.floor(Math.random() * total)
        selected.add(randomIndex)
    }
    randomQuestions.value = Array.from(selected).map(index => quiz.value.questions[index])
}

const next = ()=>{
    const response = document.querySelector(`input[name="q${currentQuestion.value}"]:checked`)
    if (response){
        userAnswers.value[currentQuestion.value] = response.value

        const correct = document.querySelector(`label:has(input[value="${randomQuestions.value[currentQuestion.value].answer}"])`)
        correct.style = 'background-color: green';
        
        if (response.value === randomQuestions.value[currentQuestion.value].answer){
            score.value++
        }
    }

    setTimeout(() =>{
        if (currentQuestion.value < randomQuestions.value.length -1){
            currentQuestion.value++
            page.value = currentQuestion.value + 1
        } else {
            alert(`Congratulations!!! Your final score is: ${score.value}`)
        }
    },1000)
}

const prev = () => {
    if (currentQuestion.value > 0) {
        currentQuestion.value--
        page.value = currentQuestion.value + 1
    }
}
</script>