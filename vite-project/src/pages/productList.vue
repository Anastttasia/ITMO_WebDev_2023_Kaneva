<script>
import TemplateCard from '../components/templateUpCard.vue';
const response = await fetch('https://fakestoreapi.com/products')
const PRODUCTS_DATA = await response.json();
console.log(PRODUCTS_DATA)

export default {
    data() {
        return {
            products: PRODUCTS_DATA
        };
    },
    components: { TemplateCard }
};

</script>

<template>
  <div style="max-width: 100%">
    <div class="cardsGrid">
      <TemplateCard 
        v-for="item in products" 
        :key="item.id"
        :image= item.image
        :title="item.title"
        :price="item.price"
        :description="item.description"
      ></TemplateCard>
    </div>
</div>
</template>

<style scoped>
.cardsGrid {
  width: 100%;
  display: grid;
  grid-template-columns: 24.25% 24.25% 24.25% 24.25%;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}

@media screen and (max-width: 1780px) {
  .cardsGrid {
    
    display: grid;
    grid-template-columns: 32.5% 32.5% 32.5%;
    grid-column-gap: 1rem;
    grid-row-gap: 1rem;
  }
}

@media screen and (max-width: 1230px) {
  .cardsGrid {
    display: grid;
    grid-template-columns: 49% 49% ;
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
