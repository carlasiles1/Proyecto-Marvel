<style scoped>
main{
    background-color: #191129;
    display: flex;
    height: 100vh;    
    justify-content: center;
    align-items: center;
    margin: -0.5rem;
}
form{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
h1 {
    color: #ca1a1a;
    text-align: center;
    padding: 7rem 8rem 5rem 0;
    width: 30%;
}
.question {
    margin-bottom: 20px;
}
.question p{
    font-size: 2rem;
    color: rgb(206, 178, 21);
}
.question label{
    display: block;
    margin: 2rem; 
    color: white;
}
.question label input{
    margin-right: 1rem;
}
button {
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;
}
button:hover {
    background-color: #0056b3;
}
main img{
    width: 32rem;
    margin-left: 8rem;
}
</style>

<template>
    <main>
        <h1>Avengers Comics Quiz</h1>
        <form id="quizForm">
            <div class="question">
                <p>1. Who is the leader of the Avengers?</p>
                <label><input type="radio" name="q1" value="Steve Rogers"> Steve Rogers</label>
                <label><input type="radio" name="q1" value="Tony Stark"> Tony Stark</label>
                <label><input type="radio" name="q1" value="Bruce Banner"> Bruce Banner</label>
                <label><input type="radio" name="q1" value="Thor"> Thor</label>
            </div> 
            <!-- <div class="question">
                <p>2. Which character was introduced in "The Avengers" #1 as a founding member?</p>
                <label><input type="radio" name="q2" value="Spider-Man"> Spider-Man</label>
                <label><input type="radio" name="q2" value="Iron Man"> Iron Man</label>
                <label><input type="radio" name="q2" value="Hulk"> Hulk</label>
                <label><input type="radio" name="q2" value="Ant-Man"> Ant-Man</label>
            </div>
            
            <div class="question">
                <p>3. What is Captain America's shield made of?</p>
                <label><input type="radio" name="q3" value="Adamantium"> Adamantium</label>
                <label><input type="radio" name="q3" value="Vibranium"> Vibranium</label>
                <label><input type="radio" name="q3" value="Steel"> Steel</label>
                <label><input type="radio" name="q3" value="Titanium"> Titanium</label>
            </div>
            
            <div class="question">
                <p>4. In which comic book series did Captain America first appear?</p>
                <label><input type="radio" name="q4" value="Captain America"> Captain America</label>
                <label><input type="radio" name="q4" value="Tales of Suspense"> Tales of Suspense</label>
                <label><input type="radio" name="q4" value="Avengers"> Avengers</label>
                <label><input type="radio" name="q4" value="Marvel Premiere"> Marvel Premiere</label>
            </div>
            
            <div class="question">
                <p>5. Who is known as the "God of Thunder"?</p>
                <label><input type="radio" name="q5" value="Steve Rogers"> Steve Rogers</label>
                <label><input type="radio" name="q5" value="Tony Stark"> Tony Stark</label>
                <label><input type="radio" name="q5" value="Thor"> Thor</label>
                <label><input type="radio" name="q5" value="Bruce Banner"> Bruce Banner</label>
            </div>
            
            <div class="question">
                <p>6. What is the name of Tony Stark's AI assistant?</p>
                <label><input type="radio" name="q6" value="Jarvis"> Jarvis</label>
                <label><input type="radio" name="q6" value="Vision"> Vision</label>
                <label><input type="radio" name="q6" value="Spider-Man"> Spider-Man</label>
                <label><input type="radio" name="q6" value="Pepper Potts"> Pepper Potts</label>
            </div>
            
            <div class="question">
                <p>7. Which character was the first to join the Avengers after their initial team-up?</p>
                <label><input type="radio" name="q7" value="Wasp"> Wasp</label>
                <label><input type="radio" name="q7" value="Hawkeye"> Hawkeye</label>
                <label><input type="radio" name="q7" value="Black Panther"> Black Panther</label>
                <label><input type="radio" name="q7" value="Spider-Man"> Spider-Man</label>
            </div>
            
            <div class="question">
                <p>8. What is the name of the alien race that the Kree belong to?</p>
                <label><input type="radio" name="q8" value="Celestials"> Celestials</label>
                <label><input type="radio" name="q8" value="Eternals"> Eternals</label>
                <label><input type="radio" name="q8" value="Kree"> Kree</label>
                <label><input type="radio" name="q8" value="Xandarans"> Xandarans</label>
            </div>
            
            <div class="question">
                <p>9. In which issue of "The Avengers" did Captain America first wear his iconic red, white, and blue costume?</p>
                <label><input type="radio" name="q9" value="#1"> #1</label>
                <label><input type="radio" name="q9" value="#5"> #5</label>
                <label><input type="radio" name="q9" value="#10"> #10</label>
                <label><input type="radio" name="q9" value="#15"> #15</label>
            </div>
            
            <div class="question">
                <p>10. Who is the first female member of the Avengers?</p>
                <label><input type="radio" name="q10" value="Wasp"> Wasp</label>
                <label><input type="radio" name="q10" value="Spider-Woman"> Spider-Woman</label>
                <label><input type="radio" name="q10" value="Scarlet Witch"> Scarlet Witch</label>
                <label><input type="radio" name="q10" value="Black Widow"> Black Widow</label>
            </div>
            
            <div class="question">
                <p>11. What is the name of the organization that trains Captain America?</p>
                <label><input type="radio" name="q11" value="S.H.I.E.L.D."> S.H.I.E.L.D.</label>
                <label><input type="radio" name="q11" value="HYDRA"> HYDRA</label>
                <label><input type="radio" name="q11" value="Asgardian Academy"> Asgardian Academy</label>
                <label><input type="radio" name="q11" value="Avengers Academy"> Avengers Academy</label>
            </div>
            
            <div class="question">
                <p>12. Which event led to the formation of the Avengers?</p>
                <label><input type="radio" name="q12" value="Secret Invasion"> Secret Invasion</label>
                <label><input type="radio" name="q12" value="Infinity War"> Infinity War</label>
                <label><input type="radio" name="q12" value="Avengers Initiative"> Avengers Initiative</label>
                <label><input type="radio" name="q12" value="Civil War"> Civil War</label>
            </div>
            
            <div class="question">
                <p>13. What is the name of the alien race that the Skrulls belong to?</p>
                <label><input type="radio" name="q13" value="Kree"> Kree</label>
                <label><input type="radio" name="q13" value="Shi'ar"> Shi'ar</label>
                <label><input type="radio" name="q13" value="Skrulls"> Skrulls</label>
                <label><input type="radio" name="q13" value="Xandarans"> Xandarans</label>
            </div>
            
            <div class="question">
                <p>14. Who is the first Black member of the Avengers?</p>
                <label><input type="radio" name="q14" value="T'Challa"> T'Challa</label>
                <label><input type="radio" name="q14" value="Luke Cage"> Luke Cage</label>
                <label><input type="radio" name="q14" value="Sam Wilson"> Sam Wilson</label>
                <label><input type="radio" name="q14" value="Blade"> Blade</label>
            </div>
            
            <div class="question">
                <p>15. What is the name of the alien race that the Xandarans belong to?</p>
                <label><input type="radio" name="q15" value="Kree"> Kree</label>
                <label><input type="radio" name="q15" value="Shi'ar"> Shi'ar</label>
                <label><input type="radio" name="q15" value="Xandarans"> Xandarans</label>
                <label><input type="radio" name="q15" value="Skrulls"> Skrulls</label>
            </div> 
            <button type="button" @click="checkAnswers">Submit</button>-->
            <button type="button">Prev</button>
            <button type="button">Next</button>
        </form>

        <img src="@/assets/img/theWatcher.png" alt="">
    </main>
</template>

<script setup>
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