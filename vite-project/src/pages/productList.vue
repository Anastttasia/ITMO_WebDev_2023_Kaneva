<script setup>
import data from '../constants/constants.js'
import Template from '../components/templateCard.vue'
// let containerForCards = document.getElementById('containerForCardsVase');
// for (let i = 0; i < data.doors.length; i++) {
//   containerForCards.appendChild(createCard(data.descriptions.door, data.doors[i]));
// }
</script>

<template>
  <div id="containerForCards" class="cardsGrid">
    <Template></Template>
    <Template></Template>
    <Template></Template>
    <Template></Template>
  </div>
</template>

<style scoped>
.cardsGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}

@media screen and (max-width: 1780px) {
  .cardsGrid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
}

@media screen and (max-width: 1230px) {
  .cardsGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
}


@media (max-width: 640px) {
    .cardsGrid {
      display: flex;
      flex-direction: column;
      margin: 2rem 0.5rem 0 0.5rem;
    }
}
</style>
