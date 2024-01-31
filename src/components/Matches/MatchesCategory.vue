<template>
  <div>
    <div class="custom-box-meciuri">
      <div class="window-buttons" @click="showFixtures" :class="{ active: showFixturesData }">
        FIXTURES
      </div>
      <div class="window-buttons" @click="showResults" :class="{ active: !showFixturesData }">
        RESULTS
      </div>
    </div>
    <div>
      <div v-if="showFixturesData">
        <div v-for="(fixture, index) in fixturesData" :key="index">
          <div class="containerTD">
            <div class="fixtureContainer">
              <div class="dateBox">{{ fixture.Date }}</div>
              <div class="fixtureBox">
                <div
                  :class="{
                    statusBox: true,
                    awayStatusBox: !fixture.IsHome,
                    homeStatusBox: fixture.IsHome,
                  }"
                >
                  <div class="mirror-text">{{ fixture.IsHome ? "HOME" : "AWAY" }}</div>
                </div>
                <div class="infoBox">
                  <div style="margin-bottom: 3vh" v-if="fixture.CompetitionId">
                    <img
                      src="@/assets/images/location.png"
                      alt="Location Icon"
                      class="locationIcon"
                    />
                    {{ fixture.CompetitionId.Name }}
                  </div>
                  <div>
                    <img src="@/assets/images/clock.png" alt="Clock Icon" class="clockIcon" />
                    {{ fixture.MatchDate }}
                  </div>
                </div>
                <div class="teamsBox">
                  <img class="team" :src="$utils.GetImageFormat(fixture.AwayImgBase64)" />
                  <div class="vs">VS</div>
                  <img class="team" :src="$utils.GetImageFormat(fixture.HomeImgBase64)" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
          <button class="btn btn-primary w-25" @click="$emit('addFixures')">Show more</button>
        </div>
      </div>

      <div v-else>
        <div v-for="(result, indexResults) in resultsData" :key="indexResults">
          <div class="container">
            <div class="resultContainer">
              <div class="dateBox">{{ result.Date }}</div>
              <div class="resultBox">
                <div class="items">
                  <div class="rowtdr">
                    <div class="infoBox">
                      <div style="margin-bottom: 3vh">
                        <img
                          src="@/assets/images/location.png"
                          alt="Location Icon"
                          class="locationIcon"
                        />
                        {{ result.CompetitionId.Name }}
                      </div>
                      <div>
                        <img src="@/assets/images/clock.png" alt="Clock Icon" class="clockIcon" />
                        {{ result.MatchDate }}
                      </div>
                    </div>
                    <div class="teamsBox">
                      <img
                        class="team"
                        :src="$utils.GetImageFormat(result.HomeImgBase64)"
                        alt="Team 1 Emblem"
                      />
                      <div class="score">{{ result.HomePoints }} - {{ result.AwayPoints }}</div>
                      <img
                        class="team"
                        :src="$utils.GetImageFormat(result.HomeImgBase64)"
                        alt="Team 2 Emblem"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center mt-5">
          <button class="btn btn-primary w-25" @click="$emit('addResults')">Show more</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Results from "@/components/Matches/Results.vue";
import AdminFixtures from "@/components/Matches/AdminFixtures.vue";
import AdminResults from "@/components/Matches/AdminResults.vue";

export default {
  name: "MatchesCategory",
  components: {
    Results,
    AdminFixtures,
    AdminResults,
  },
  props: {
    fixturesData: {
      type: Array,
      required: true,
    },
    resultsData: {
      type: Array,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showFixturesData: true,
    };
  },
  methods: {
    showFixtures() {
      this.showFixturesData = true;
    },
    showResults() {
      this.showFixturesData = false;
    },
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
  background-color: red;
  flex-direction: column;
  height: 20vh;
  width: 5vw;
  border-radius: 20px;
}

.editItem {
  display: flex;
  background-color: black;
  justify-content: center;
  height: 4vh;
  width: 2vw;
  margin-left: 1.5vw;
  border-radius: 5px;
}

.icon {
  display: flex;
  height: 80%;
  width: 50%;
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
.custom-box-meciuri {
  height: 55px;
  background-color: #7cb7f4;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.window-buttons {
  margin: 0 7vw;
  font-size: 1rem;
  font-weight: bold;
}

.custom-box-meciuri .window-buttons {
  cursor: pointer;
  opacity: 0.5;
}

.custom-box-meciuri .window-buttons.active {
  opacity: 1;
}
</style>
