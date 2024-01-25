<template>
    <div class="container">
        <div class="resultContainer">
            <div class="dateBox">{{ currentDate }}</div>
            <div class="resultBox">
                <div class="items">
                    <div class="rowtdr">
                        <div class="infoBox">
                            <div style="margin-bottom: 3vh;">
                                <img src="../../assets/images/location.png" alt="Location Icon" class="locationIcon">
                                {{ stadion }}
                            </div>
                            <div>
                                <img src="../../assets/images/clock.png" alt="Clock Icon" class="clockIcon">
                                {{ ora }}
                            </div>
                        </div>
                        <div class="teamsBox">
                            <img class="team" :src="team1Emblem" alt="Team 1 Emblem">
                            <div class="score">{{ team1Score }} - {{ team2Score }}</div>
                            <img class="team" :src="team2Emblem" alt="Team 2 Emblem">
                        </div>
                       
                    </div>
                    <div class="hubButton">
                        <button class="matchHub">MATCH HUB</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'UserResults',
    props: {
        stadion: String,
        ora: String,
        team1Emblem: String,
        team2Emblem: String,
        currentDate: String,
        team1Score: Number,
        team2Score: Number
    },
};
</script>
  
<style scoped>
.rowtdr {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.items {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.dateBox {
    width: 15vw;
    font-size: 1.5rem;
    font-weight: bold;
    color: #898282;
    margin-bottom: 18vh;
}

.resultContainer {
    display: flex;
    align-items: center;
}

.resultBox {
    background-color: #eeecec;
    border-radius: 20px;
    width: 65vw;
    height: 30vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin-left: 5vw;
    display: flex;
    align-items: center;
    flex-grow: 1;
}


.infoBox {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    flex-grow: 1;
    color: #898282;
    font-weight: bold;
    width: 15vw;
    height: 18vh;
    padding-top: 5vh;
    padding-bottom: 5vh;
    padding-left: 2vw;
    border-right: 2px solid #c6c6c6;
}

.locationIcon,
.clockIcon {
    width: 20px;
    height: 20px;
    margin-right: 5px;
}

.teamsBox {
    display: flex;
    align-items: center;
    height: 18vh;
    width: 45vw;
    padding-left: 8vw;
}

.team {
    width: 12vw;
    height: 12vh;
    object-fit: contain;
    border-radius: 10px;
}

.score {
    font-size: 1.6rem;
    font-weight: bold;
}

.matchHub {
    background-color: #f41717;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: bold;
    color: #ffffff;
}

.hubButton {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20vw;
    padding: 20px;
    width: 100%;
    padding-inline: 28vw;
    border-top: 2px solid #c6c6c6;
}

</style>
  