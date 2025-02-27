<template>
  <main>
    <form id="formulario">
      <div class="form-group">
        <label for="nombre">Name:</label>
        <input type="text" id="nombre" name="nombre" required />
      </div>

      <div class="form-group">
        <label for="email">E-mail:</label>
        <input type="email" id="email" name="email" required />
      </div>

      <div class="form-group">
        <label for="mensaje">Message:</label>
        <textarea id="mensaje" name="mensaje" required></textarea>
      </div>
      <div>

      </div>
    </form> 
  </main>
</template>

<style>
main{
  background-color: #191129;
  display: flex;
  height: 100vh;    
  justify-content: center;
  align-items: center;
  margin: -0.5rem;
}
h1{
color:white;
}
.form-group{
display:flex;
flex-direction:column;
margin:20px;

}
label{
color:white;
}
textarea{
width:100%;
height:100px;
}


</style>
