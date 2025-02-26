<style scoped>
.quiz {
    background-color: #191129;
    display: flex;
    height: 100vh;    
    justify-content: center;
    align-items: center;
    margin: -0.5rem;
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
    padding: 7rem 8rem 5rem 0;
    width: 30%;
}

.quiz__question {
    margin-bottom: 20px;
}

.quiz__question-text {
    font-size: 2rem;
    color: rgb(206, 178, 21);
}

.quiz__label {
    display: block;
    margin: 2rem; 
    color: white;
}

.quiz__input {
    margin-right: 1rem;
}

.quiz__button {
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
    width: 5rem;
    height: 2rem;
    border-radius: 2rem 0;
    margin: 0 5em;
    transition: 1s;
}

.quiz__button:hover {
    background-color: #e62429;
}

.quiz__image {
    width: 32rem;
    margin-left: 8rem;
}
</style>

<template>
    <main class="quiz">
        <h1 class="quiz__title">Avengers Comics Quiz</h1>
        <form class="quiz__form" id="quizForm">
        </form>
        <div class="quiz__navigation">
            <button @click="prev" class="quiz__button quiz__button--prev" type="button">Prev</button>
            <button @click="next" class="quiz__button quiz__button--next" type="button">Next</button>
        </div>
        <img class="quiz__image" src="@/assets/img/theWatcher.png" alt="The Watcher">
    </main>
</template>

<script setup>
import {ref, onMounted} from 'vue'

let quiz = ref({})

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
    }
    onMounted(fetchQuiz)

const questionFilter = ()=>{
    const questionSelect = quiz.value.questions.find(item =>
        item.question?.toLowerCase() === //añadir al json un id para usar un randomicer
    )
}





// function checkAnswers() {
//             const answers = {
//                 q1: "Steve Rogers",
//                 q2: "Iron Man",
//                 q3: "Vibranium",
//                 q4: "Tales of Suspense",
//                 q5: "Thor",
//                 q6: "Jarvis",
//                 q7: "Hawkeye",
//                 q8: "Kree",
//                 q9: "#1",
//                 q10: "Wasp",
//                 q11: "S.H.I.E.L.D.",
//                 q12: "Avengers Initiative",
//                 q13: "Skrulls",
//                 q14: "T'Challa",
//                 q15: "Xandarans"
//             };
//             let score = 0;

//             for (let i = 1; i <= 15; i++) {
//                 const radios = document.querySelectorAll(`input[name="q${i}"]`);
//                 let selectedValue = null;
//                 for (const radio of radios) {
//                     if (radio.checked) {
//                         selectedValue = radio.value;
//                         break;
//                     }
//                 }
//                 if (selectedValue === answers[`q${i}`]) {
//                     score++;
//                 }
//             }

//             alert(`Your score is ${score} out of 15.`);
//         }
</script>