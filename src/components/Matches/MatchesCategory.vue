<template>
  <div>
    <div class="custom-box-meciuri">
      <div
        class="window-buttons"
        @click="showFixtures"
        :class="{ active: showFixturesData }"
      >
        FIXTURES
      </div>
      <div
        class="window-buttons"
        @click="showResults"
        :class="{ active: !showFixturesData }"
      >
        RESULTS
      </div>
    </div>
    <div>
      <div v-if="showFixturesData">
        <div v-for="(fixture, index) in fixturesData" :key="index">
          <component
            :is="isAdmin ? 'AdminFixtures' : 'Fixtures'"
            :isHome="fixture.isHome"
            :stadion="fixture.stadion"
            :ora="fixture.ora"
            :team1Emblem="fixture.team1Emblem"
            :team2Emblem="fixture.team2Emblem"
            :currentDate="fixture.currentDate"
          ></component>
        </div>
      </div>

      <div v-else>
        <div v-for="(result, indexResults) in resultsData" :key="indexResults">
          <component
            :is="isAdmin ? 'AdminResults' : 'Results'"
            :stadion="result.stadion"
            :ora="result.ora"
            :team1Emblem="result.team1Emblem"
            :team2Emblem="result.team2Emblem"
            :currentDate="result.currentDate"
            :team1Score="result.team1Score"
            :team2Score="result.team2Score"
          ></component>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Fixtures from "@/components/Matches/Fixtures.vue";
import Results from "@/components/Matches/Results.vue";
import AdminFixtures from "@/components/Matches/AdminFixtures.vue";
import AdminResults from "@/components/Matches/AdminResults.vue";

export default {
  name: 'MatchesCategory',
  components: {
    Fixtures,
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
