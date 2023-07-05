<script setup>
</script>

<template>
    <div class="pageCard">
        <div class="descriptionCard">
            <button class="btnBack">Back</button>
            <h3 class="name">Opna Women's Short Sleeve Moisture</h3>
            <h4 class="price">$7.95</h4>
            <p class="description">100% Polyester, Machine wash, 100% cationic polyester interlock,
                Machine Wash & Pre Shrunk for a Great Fit, Lightweight
            </p>
            <button class="button">Add</button>
        </div>
        <div class="containerImg"><img src="../image/51eg55uWmdL._AC_UX679_.jpg " class="image"></div>
    </div>
</template>

<style>
.btnBack {
    width: 3rem;
    color: rgb(0, 174, 255);
    font-size: small;
    border: 1px solid rgba(0, 174, 255, 0.548);
    border-radius: 3px;

}

.btnBack:hover {
    background-color: rgba(0, 174, 255, 0.171);
}

.pageCard {
    display: flex;
    flex-direction: row;
    margin: 2rem 2rem 0 2rem;
}

.descriptionCard {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 0 4px 0 4px;
}

.name {
    font-weight: 700;
    font-size: 20px;
    color: rgba(43, 41, 41, 0.658);
    margin-top: 1rem;
}

.price {
    color: black;
    font-weight: 600;
    font-size: 20px;
    margin: 1rem 0 1rem 0;
}

.description {
    font-size: 12px;
    color: rgba(43, 41, 41, 0.658);
}

.button {
    width: 100%;
    height: 35px;
    font-size: small;
    border: 1px solid rgb(125, 199, 14);
    border-radius: 5px;
    background-color: transparent;
    color: rgb(125, 199, 14);
    margin-top: 1rem;
}

.button:hover {
    background-color: rgba(125, 199, 14, 0.171);
}

@media (max-width: 640px) {
    .pageCard {
        flex-direction: column;
        margin: 2rem 0.5rem 0 0.5rem;
    }
}
</style>