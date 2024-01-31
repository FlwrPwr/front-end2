<template>
  <div class="customBox">
    <div class="gameStatus">
      <div class="gameButton" style="margin-left: 5vw">Last game</div>
      <div class="gameButton" style="margin-right: 5vw; color: blue">Next game</div>
    </div>
    <div class="infoBox">
      <div class="infoText" style="margin-left: 5vw">
        <img src="@/assets/images/location.png" alt="Location Icon" class="locationIcon" />
        Sala Polivalenta Cluj-Napoca
      </div>
      <div class="infoText" style="margin-right: 7.5vw">
        <img src="@/assets/images/clock.png" alt="Clock Icon" class="clockIcon" />
        14:00
      </div>
    </div>
    <div class="emblemsBox">
      <img
        class="team"
        src="@/assets/echipe/uCluj.png"
        alt="Team 1 Emblem"
        style="margin-left: 5vw"
      />
      <div class="vs">VS</div>
      <img
        class="team"
        src="@/assets/images/emblem.jpg"
        alt="Team 2 Emblem"
        style="margin-right: 5vw"
      />
    </div>
    <div class="detaliiButton">03 Februarie 2024</div>
  </div>
</template>

<script>
export default {
  name: "Clasament",
  props: {
    matches: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.customBox {
  width: 35vw;
  height: 45vh;
  border-radius: 20px;
  border-color: 3px solid #4b6ad7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 5vh;
  background-color: #ffffff;
}

.gameStatus {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 3vh;
  width: 100%;
}

.gameButton {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 3vh;
  width: 20%;
  border: 2px solid grey;
  color: black;
  border-radius: 10px;
  font-weight: bold;
}

.infoBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 5vh;
  width: 100%;
  border-bottom: 2px solid grey;
  color: black;
  margin-top: 1vh;
}

.locationIcon,
.clockIcon {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.infoText {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: black;
}

.emblemsBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 15vh;
  width: 100%;
  margin-top: 1vh;
}

.team {
  width: 7.5vw;
  height: 15vh;
  border-radius: 10px;
}

.vs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  width: 2.5vw;
  height: 5vh;
  border-radius: 50%;
  border: 2px solid red;
}

.detaliiButton {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  width: 16vw;
  height: 3vw;
  border-radius: 10px;
  background-color: blue;
  margin-top: 2vh;
}
</style>
