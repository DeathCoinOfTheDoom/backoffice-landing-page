<template>
  <carousel
    :per-page="1"
    :mouse-drag="true"
    :centerMode="true"
    :autoplay="true"
    :loop="true"
    :autoplayTimeout="5000"
  >
    <slide>
      <div class="bobbers__circle bobbers__circle__charpentier"></div>
      <p class="section__subtitle">Bob Electricien</p>
    </slide>
    <slide>
      <div class="bobbers__circle bobbers__circle__plombier"></div>
      <p class="section__subtitle">Bob Pomblier</p>
    </slide>
    <slide>
      <div class="bobbers__circle bobbers__circle__peintre"></div>
      <p class="section__subtitle">Bob Charpentier</p>
    </slide>
    <slide>
      <div class="bobbers__circle bobbers__circle__electricien"></div>
      <p class="section__subtitle">Bob Peintre</p>
    </slide>
    <slide>
      <div class="bobbers__circle bobbers__circle__architecte"></div>
      <p class="section__subtitle">Bob Architecte</p>
    </slide>
  </carousel>
</template>
<style>
.VueCarousel-dot[data-v-438fd353] {
  height: 6px !important;
  width: 35px !important;
  background-color: #e3f8ff !important;
  border-radius: 4px !important;
  padding: 2px !important;
  margin-top: 0px !important;
}

.VueCarousel-dot--active[data-v-438fd353] {
  background-color: #81defd !important;
}
</style>
