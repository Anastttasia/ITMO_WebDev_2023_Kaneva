<script setup>
import templateUpCard from './templateUpCard.vue'

</script>

<template>
    <div class="card">
        <templateUpCard></templateUpCard>
        <div class="btnBlock">
            <button class="buttonBin"><img src="../image/icon/delete.png" style="width: 15px; height: 15px;"></button>
            <button class="button">Add</button>
        </div>
    </div>
</template>

<style scoped>
    .card{
        width: 100%;
        background-color: rgb(224, 222, 222);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5%;
        color: black;
        padding: 5px  5px 0.5rem 5px;
    }

    .btnBlock{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        padding-bottom: 1rem ;
        align-items: center;
        justify-content:center;
    }
    .buttonBin{
        width: 40px;
        height: 35px;
        border-radius: 5px;
        background-color: rgba(199, 42, 14, 0.226);
        display: flex;
        align-items: center;
        justify-content:center;
        margin: 1rem 1rem 0 4px ;
    }
    .button{
        width: 100%;
        height: 35px;
        font-size: small;
        border: 1px solid rgb(125, 199, 14);
        border-radius: 5px;
        background-color: transparent;
        color: rgb(125, 199, 14);
        margin-top: 1rem;
    }
    .button:hover{
        background-color: rgba(125, 199, 14, 0.171);
    }
</style>