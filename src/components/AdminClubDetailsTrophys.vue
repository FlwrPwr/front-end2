<template>
    <div class="trophy-box">
        <img :src="trophyImage" alt="Trophy Image" class="trophy-image" />
        <div class="trophy-year">{{ trophyYear }}</div>
        <div class="trophy-actions">
            <button class="action-button">Edit</button>
            <button class="action-button">Delete</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        trophyImage: String,
        trophyYear: String,
    },
};
</script>

<style scoped>
.trophy-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 18vw;
    height: 45vh;
    border: 2px solid black;
    border-radius: 20px;
    padding: 10px;
    margin-top: 4vh;
    margin-left: 2vw;
    background-color: white;
}

.trophy-image {
    width: 15vw;
    height: 28vh;
    object-fit: cover;
    border-radius: 20px;
    margin-top: 2vh;
}

.trophy-year {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2vh;
}

.trophy-actions {
    display: flex;
    justify-content: space-between;
}

.action-button {
    padding: 5px 10px;
    background-color: #ccc;
    border: none;
    color: black;
    cursor: pointer;
    border-radius: 10px;
    margin-inline: 5px;
}
</style>
