<style scoped>
input{
    display: none;
}
.marvel-quiz {
    background-color: #191129;
    justify-content: center;
    align-items: center;
    margin: -0.5rem;
    height: 100vh;
}

.marvel-quiz__screen {
    display: flex;
    justify-content: center;
}

.marvel-quiz__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.marvel-quiz__title {
    color: #ca1a1a;
    text-align: center;
    width: 30%;
    margin: 0;
    padding-top: 6rem;
}

.marvel-quiz__question-text {
    font-size: 2rem;
    color: rgb(206, 178, 21);
}

.marvel-quiz__options {
    display: flex;
}

.marvel-quiz__option {
    color: white;
    width: 10rem;
    display: flex;
    text-align: center;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    border-radius: 20%;
    margin: 3rem;
}

.marvel-quiz__option--selected {
    background-color: #007BFF;
}

.marvel-quiz__option--correct {
    background-color: green;
}

.marvel-quiz__option-text {
    width: 100%;
}

.marvel-quiz__radio {
    display: none;
}

.marvel-quiz__navigation {
    display: flex;
    align-items: center;
    color: #e62429;
}

.marvel-quiz__button {
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

.marvel-quiz__button:hover {
    background-color: #e62429;
}

.marvel-quiz__watcher-image {
    width: 22rem;
    margin-left: 8rem;
}

.marvel-quiz__pointer {
    position: absolute;
    width: 5rem;
    transform: rotateZ(-35Deg) translate(6rem, 3rem);
}

.marvel-quiz__character-image {
    width: 15rem;
    height: 15rem;
    object-fit: cover;
    border-radius: 10%;
}
</style>

<template>
    <main class="marvel-quiz">
        <h1 class="marvel-quiz__title">Avengers Comics Quiz</h1>
        <div class="marvel-quiz__screen">
            <form class="marvel-quiz__form" id="quizForm">
                <div v-if="randomQuestions.length" class="marvel-quiz__question">
                    <p class="marvel-quiz__question-text">{{ randomQuestions[currentQuestion].question }}</p>
                    <div class="marvel-quiz__options">
                        <label v-for="option in randomQuestions[currentQuestion].options" 
                            :key="option" 
                            class="marvel-quiz__option"
                            :class="{'marvel-quiz__option--selected': userAnswers[currentQuestion] === option}">
                            <input type="radio" 
                                class="marvel-quiz__radio"
                                name="choseOption" 
                                :value="option" 
                                v-model="userAnswers[currentQuestion]">
                            <p class="marvel-quiz__option-text">{{ option }}</p>
                            <img v-if="matchingCharacter(option)"
                                :src="matchingCharacter(option).image" 
                                :alt="matchingCharacter(option).name"
                                class="marvel-quiz__character-image">
                            <img v-if="userAnswers[currentQuestion] === option" 
                                :src="source" 
                                alt="Iron-man Pointer" 
                                class="marvel-quiz__pointer">
                        </label>
                    </div>
                </div>
                <div class="marvel-quiz__navigation">
                    <button @click="prev" 
                            class="marvel-quiz__button marvel-quiz__button--prev" 
                            type="button">Prev</button>
                    <p class="marvel-quiz__page">{{ page }} / 15</p>
                    <button @click="next" 
                            class="marvel-quiz__button marvel-quiz__button--next" 
                            type="button">Next</button>
                </div>
            </form>
            <img class="marvel-quiz__watcher-image" 
                 src="@/assets/img/theWatcher.png" 
                 alt="The Watcher">
        </div>
    </main>
</template>

<script setup>
import {ref, computed, onMounted, watch} from 'vue'
import axios from "axios";
import md5 from "md5";

const quiz = ref({})
const randomQuestions = ref([])
const currentQuestion = ref(0)
const userAnswers = ref({})
const score = ref(0)
const source = ref('')

const page = ref('')
page.value = 1

//Cuando sale dos veces el mismo nombre en una respuesta seguido, se queda printado en verde

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
onMounted(async () => {
  await fetchQuiz();
  await loadCurrentQuestionCharacters();
})

const getRandomQuestions = ()=>{
    const total = quiz.value.questions.length

    while(selected.size < 15){
        const randomIndex = Math.floor(Math.random() * total)
        selected.add(randomIndex)
    }
    randomQuestions.value = Array.from(selected).map(index => quiz.value.questions[index])
}

const next = ()=>{

    const correct = document.querySelector(`label:has(input[value="${randomQuestions.value[currentQuestion.value].answer}"])`)
    correct.style = 'background-color: green';

    const response = document.querySelector(`input[name="${currentQuestion.value}"]:checked`)
    if (response){
        userAnswers.value[currentQuestion.value] = response.value
        
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

//Uso de la API

const marvelCharacter = ref([])

const marvelApiPublicKey = 'c6505251612e731238b4d32531d6a998';
const marvelApiPrivateKey = 'ee80321c4497db2e446a64fb6b78d032066c80e1';

// Modificar la función fetchMarvelComics para que devuelva el personaje
const fetchMarvelComics = async (characterName) => {
  const timestamp = new Date().getTime();
  const hash = md5(timestamp + marvelApiPrivateKey + marvelApiPublicKey);

  try {

    const searchName = characterName
      .toLowerCase()
      .replace(/-/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    const response = await axios.get("https://gateway.marvel.com/v1/public/characters", {
      params: {
        apikey: marvelApiPublicKey,
        ts: timestamp,
        hash: hash,
        nameStartsWith: searchName,
        limit: 1
      },
    })

    console.log(response.data.data.results)
    
    if (response.data?.data?.results?.[0]) {
      const character = response.data.data.results[0];
      return {
        name: character.name.toLowerCase(),
        image: `${character.thumbnail.path}.${character.thumbnail.extension}`
      };
    }
    return null;
    } catch (error) {
    console.error("Error getting data for " + characterName, error);
    return null;
  }
};
onMounted(fetchMarvelComics)

// Añadir función para cargar los personajes de la pregunta actual
const loadCurrentQuestionCharacters = async () => {
  if (!randomQuestions.value[currentQuestion.value]) return;
  
  marvelCharacter.value = []; // Limpiar personajes anteriores
  const options = randomQuestions.value[currentQuestion.value].options;
  
  // Cargar los personajes de todas las opciones
  const characters = await Promise.all(
    options.map(option => fetchMarvelComics(option))
  );
  
  // Filtrar null y añadir los personajes encontrados
  marvelCharacter.value = characters.filter(char => char !== null);
  
  console.log("Personajes cargados para la pregunta actual:", 
    marvelCharacter.value.map(char => char.name));
};

// Modificar el watcher para currentQuestion
watch(currentQuestion, async () => {
  await loadCurrentQuestionCharacters();
});

// Añade esta función después de la declaración de marvelCharacter
const matchingCharacter = computed(() => {
  return (option) => {
    // Normalizar el nombre de la opción
    const normalizedOption = option.toLowerCase()
      .replace(/-/g, ' ')  // Reemplazar guiones por espacios
      .replace(/\s+/g, ' ') // Normalizar espacios múltiples
      .trim();

    return marvelCharacter.value.find(character => {
      // Normalizar el nombre del personaje de la API
      const normalizedCharName = character.name.toLowerCase()
        .replace(/-/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Comprobar si los nombres coinciden o si uno contiene al otro
      return normalizedCharName === normalizedOption ||
             normalizedCharName.includes(normalizedOption) ||
             normalizedOption.includes(normalizedCharName);
    });
  };
});
</script>