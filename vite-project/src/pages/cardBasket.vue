<script setup>
import templateUpCard from '../components/templateUpCard.vue'
</script>

<template>
    <button class="btnBack">Back</button>
    <div class="slot">
        <div class="halfSlot">

            <templateUpCard></templateUpCard>
        </div>
        <div class="infoBlock">
            <p>Qty: 1</p>
            <p>Result: $ 233</p>
            <button class="buttonAdd">Add</button>
            <button class="buttonBin"><img src="../image/icon/delete.png" style="width: 15px; height: 15px;"></button>
        </div>
    </div>
</template>

<style>
.slot {
    width: 100%;
    background-color: rgba(219, 212, 212, 0.199);
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 5px;
    color: black;
    padding: 5px 5px 0.5rem 5px;
}

.halfSlot {
    width: 50%;
}

.infoBlock {
    width: 50%;
    margin-left: 1rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.btnBack {
    width: 3rem;
    color: rgb(0, 174, 255);
    font-size: small;
    border: 1px solid rgba(0, 174, 255, 0.548);
    border-radius: 3px;
    margin-bottom: 2rem;
}

.btnBack:hover {
    background-color: rgba(0, 174, 255, 0.171);
}

.buttonBin {
    width: 40px;
    height: 35px;
    border-radius: 5px;
    background-color: rgba(199, 42, 14, 0.226);
    display: flex;
    align-items: center;
    justify-content: center;
}

.buttonAdd {
    width: 5rem;
    height: 35px;
    font-size: small;
    border: 1px solid rgb(125, 199, 14);
    border-radius: 5px;
    background-color: rgba(125, 199, 14, 0.171);
    color: rgb(125, 199, 14);
}

.button:hover {
    background-color: rgba(57, 94, 3, 0.171);
}

@media (max-width: 640px) {
    .slot {
        flex-direction: column;
        margin: 0;
        padding-bottom: 1rem ;
    }

    .halfSlot {
        width: 100%;
    }

    .btnBack {
        margin: 1rem 0 1rem 0.5rem;
    }

    .infoBlock {
        font-size: large;
        width: 100%;
        height: 100%;
        margin-left: 0;
        display: flex;
        align-items: center;
        padding: 2rem 2rem 0 2rem;
    }
}
</style>