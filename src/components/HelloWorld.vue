<template>
    <div class="hello">
      <h1>{{ msg }}</h1>
      <p>
        Este es un componente de ejemplo generado automáticamente.
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: "HelloWorld",
    props: {
      msg: {
        type: String,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .hello {
    text-align: center;
    margin: 20px;
  }
  h1 {
    color: #42b983;
  }
  </style>