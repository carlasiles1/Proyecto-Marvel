<template>
    <section class="About">
     <div class="content">
      <div class="text">
        <h1>Marvel Timeline</h1>
        <p>
          Marvel TImeline es compleja y está llena de eventos interconenctados.
          Comienza con la creación del universo y continúa con las aventuras de superhéros
          como Iron Man, Captian America, and Spider Man. Cada película y serie encaja en una
          narrativa más grande que abarca décad.
        </p>
      </div>
     <div class="Image">
      <img src="" alt="Marvel Timleine">
     </div>
    </div>
    </section>
</template>

<style scoped>
.about {
  background-color: #000;
  color: #fff;
  padding: 50px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content {
  display: flex;
  align-items: center;
  max-width: 1200px;
  width: 100%;
}

.text {
  flex: 1;
  padding-right: 20px;
}

.image {
  flex: 1;
  text-align: right;
}

.image img {
  max-width: 100%;
  border-radius: 10px;
}
</style>