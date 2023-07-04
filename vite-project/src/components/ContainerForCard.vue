<script setup>
import data from '../constants/constants.js'
import Template from './templateCard.vue'
// let containerForCards = document.getElementById('containerForCardsVase');
// for (let i = 0; i < data.doors.length; i++) {
//   containerForCards.appendChild(createCard(data.descriptions.door, data.doors[i]));
// }
</script>

<template>
  <div id="containerForCards" class="cardsGrid">
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
</style>
