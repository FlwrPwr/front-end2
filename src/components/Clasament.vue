<template>
  <div class="customBox">
    <div class="info">
      <div class="component" style="width: 11.5vw;">#    Team</div>
      <div class="component" style="width: 3.6vw;">MP</div>
      <div class="component" style="width: 3.6vw;">W</div>
      <div class="component" style="width: 3.6vw;">D</div>
      <div class="component" style="width: 3vw;">L</div>
      <div class="component" style="width: 3vw;">G</div>
      <div class="component" style="width: 3vw;">PTS</div>
    </div>
    <div class="matchBox" v-for="(match, index) in matches" :key="index">
      <div class="matchComponent" style="width: 1vw;">{{ match.number }}</div>
      <div class="matchComponent" style="width: 10vw;">{{ match.team }}</div>
      <div class="matchComponent" style="width: 3.5vw;">{{ match.mp }}</div>
      <div class="matchComponent" style="width: 3.5vw;">{{ match.w }}</div>
      <div class="matchComponent" style="width: 3.5vw;">{{ match.d }}</div>
      <div class="matchComponent" style="width: 3vw;">{{ match.l }}</div>
      <div class="matchComponent" style="width: 3vw;">{{ match.g }}</div>
      <div class="matchComponent" style="width: 3vw;">{{ match.pts }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clasament',
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
  background-color: #ffffff;
  border-radius: 20px;
  border-color: 3px solid #4b6ad7;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 5vh;
  color: black;
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 5vh;
  width: 100%;
  border-bottom: 2px solid grey;
  color: black;
}

.component,
.matchComponent {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-left: 0.5vw;
  white-space: nowrap; /* Prevent text wrapping */
  font-weight: bold;
}

.matchBox {
  display: flex;
  flex-direction: row;
  height: 5vh;
  width: 98%;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  border-radius: 20px;
  margin-top: 1vh;
  color: black;
}
</style>
