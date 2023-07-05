<script>
</script>

<template>
    <div class="card">
        <a>
            <div class="containerImg"><img src="../image/51eg55uWmdL._AC_UX679_.jpg " class="image"></div>
            <div class="descriptionCard">
                <h3 class="name">Opna Women's Short Sleeve Moisture</h3>
                <h4 class="price">$7.95</h4>
                <p class="description">100% Polyester, Machine wash, 100% cationic polyester interlock, 
                    Machine Wash & Pre Shrunk for a Great Fit, Lightweight
                </p>
            </div>
        </a>
        <div class="btnBlock">
            <button class="buttonBin"><img src="../image/icon/delete.png" style="width: 15px; height: 15px;"></button>
            <button class="button">Add</button>
        </div>
    </div>
</template>

<style scoped>
    .card{
        width: 100%;
        background-color: rgba(190, 190, 190, 0.418);
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: 5%;
        color: black;
        padding: 5px  5px 0.5rem 5px;
    }

    .containerImg{
        background-color: white;
        padding: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5%;
    }
    .image{
        width: 120px;
        height: 150px;
    }

    .descriptionCard{
        display: flex;
        justify-content: flex-start;
        flex-direction: column;
        padding: 0 4px 0 4px;
    }

    .name{
        font-weight: 700;
        font-size: 18px;
        color: rgba(43, 41, 41, 0.658);
    }
    .description{
        font-size: 12px;
        color: rgba(43, 41, 41, 0.658);
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