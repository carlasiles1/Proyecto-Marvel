<style scoped>
main{
  font-size: 2rem;
  display: flex;
}
ol{
  background-color: #433168;
  width: 50rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
li{
  margin: 1rem auto;
}
main ol .primero{
  font-size: 4rem;
  margin: 0 auto
}
.ultimo{
  font-size: 1.5rem;
  width: 50%;
  margin: 1rem auto;
  text-align: center;
}

</style>

<template>
    <main>
        <ol>
            <li class="primero">aaaaaaaaaaaaaaaaa
            </li>
            <li>aaaaaaaaaaaaaaaaa
            </li>
            <li>aaaaaaaaaaaaaaaaa
            </li>
            <li>aaaaaaaaaaaaaaaaa
            </li>
            <li>aaaaaaaaaaaaaaaaa
            </li>
            <li>aaaaaaaaaaaaaaaaa
            </li>
            <li>aaaaaaaaaaaaaaaaa
            </li>
            <li>aaaaaaaaaaaaaaaaa
            </li>
            <li>aaaaaaaaaaaaaaaaa
            </li>
            <li class="ultimo">aaaaaaaaaaaaaaaaa
            </li>
        </ol>
    </main>
</template>

<script setup>
// import {ref, onMounted, computed} from 'vue'

// const scores = ref([])

// const sortedScores = computed(() =>{
//     return [...scores.value].sort((a, b) => b.score - a.score)
// })

// const formatDate = (dateString)=>{
//     return new Date(dateString).toLocaleDateString()
// }

// onMounted(async ()=>{
//     try{
//         const response = await fetch('http://localhost:3000/scores')
//         const data = await response.json()
//         scores.value = data
//     } catch (error){
//         console.error('Error loading scores:', error)
//     }
// })

</script>