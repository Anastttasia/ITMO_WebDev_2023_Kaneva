<script setup>
</script>

<template>
    <div class="header">
      <div class="navigationMenu">
        <h3>Products</h3>
      </div>
      <div class="slotHeader">
        <span>Total:<p id=""></p></span>
        <router-link to="/">
          <button class="btn">Card <p id=""></p></button>
        </router-link>
      </div>
    </div>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  left: 0;
  background-color: rgba(190, 190, 190, 0.7);
  max-width: 100vw;
  height: 55px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  z-index: 2;
  margin-bottom: 20px;
  padding: 0 1rem 0 1rem;
  margin-bottom: 2rem;
  color: gray;
  border-radius: 5px;
}

h3{
  font-size: 20px;
}
.slotHeader{
  display:flex;
  flex-direction: row;
  align-items: center;
  font-weight: 700;
  color: rgba(43, 41, 41, 0.658);
}

.btn{
  height: 30px;
  width: 5rem;
  background-color: rgb(125, 199, 14);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2rem;
  font-weight: 500;
  font-size: 1rem;
  margin: 0 0.5rem 0 0.5rem;
  color: white;
  font-size: small;
  margin-left: 5rem;
}

@media (max-width: 640px) {
  .header {
  position: sticky;
  top: 0;
  left: 0;
  background-color: rgba(190, 190, 190, 0.7);
  max-width: 100vw;
  height: 55px;
  display: flex;
  justify-content:space-between;
  align-items: center;
  z-index: 2;
  margin-bottom: 20px;
  margin: 0 0.5rem 0 0.5rem;
  color: gray;
  border-radius: 5px;
}
}
</style>

