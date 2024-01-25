<template>
    <div class="containerTD">
        <div class="fixtureContainer">
            <div class="dateBox">{{ currentDate }}</div>
            <div class="fixtureBox">
                <div :class="{ 'statusBox': true, 'awayStatusBox': !isHome, 'homeStatusBox': isHome }">
                    <div class="mirror-text">{{ isHome ? 'HOME' : 'AWAY' }}</div>
                </div>
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
                    <img class="team" src="../../assets/images/emblem.jpg" alt="Echipa 1 Emblem">
                    <div class="vs">VS</div>
                    <img class="team" src="../../assets/images/emblem.jpg" alt="Echipa 2 Emblem">
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    name: 'UserFixtures',
    props: {
        isHome: Boolean,
        stadion: String,
        ora: String,
        team1Emblem: String,
        team2Emblem: String,
        currentDate: String
    },
};
</script>
  
<style scoped>

.dateBox {
    width: 15vw;
    font-size: 1.5rem;
    font-weight: bold;
    color: #898282;
    margin-left: 5vw;
    margin-bottom: 8vh;
    padding-left: 4vw;
}

.fixtureContainer {
    display: flex;
    align-items: center;
}

.fixtureBox {
    background-color: #eeecec;
    border-radius: 20px;
    width: 60vw;
    height: 20vh;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    margin-left: 5vw;
    margin-top: 5vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.statusBox {
    width: 6vw;
    height: 20vh;
    border-radius: 18px;
    justify-content: center;
    position: relative;
}

.mirror-text {
    color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) rotate(180deg);
    writing-mode: vertical-lr;
    text-orientation: sideways-right;
    text-align: center;
    font-weight: bold;
    font-size: 1.5rem;
}

.homeStatusBox {
    background-color: black;
}

.awayStatusBox {
    background-color: #bcb8b8;
}

.infoBox {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    flex-grow: 1;
    margin-left: 2vw;
    color: #898282;
    font-weight: bold;
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
}

.editBox {
    display: flex;
    flex-direction: column;
    height: 20vh;
    width: 5vw;
    border-left: 2px solid #c6c6c6;
}

.editItem {
    display: flex;
    background-color: #c6c6c6;
    justify-content: center;
    height: 4vh;
    width: 2vw;
    margin-left: 1.5vw;
    border-radius: 5px;
}

.icon{
    display: flex;
    height: 70%;
    width: 60%;
    justify-content: center;
    padding-top: 5px;
}

.team {
    width: 12vw;
    height: 12vh;
    object-fit: contain;
}

.vs {
    font-size: 1.6rem;
    font-weight: bold;
}
</style>
  