<template>
    <section class="Contact">
      <form id="formulario">
        <h1>Contact Us</h1>
        <div class="form-group">
          <label for="nombre">Name</label>
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
      </form> <!-- Aquí se cierra el formulario -->
    </section>
  </template>
  
  <style scoped>
  .Contact {
    background-color: black;
    color: white;
  }
  </style>
  