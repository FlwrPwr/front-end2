<template>
  <div>
    <div class="containerTDR">
      <div class="title">
        <h1>Meciuri</h1>
      </div>
      <div class="teams">
        <div
          class="subtitle"
          @click="selectTeam('men')"
          :class="{ selected: selectedTeam === 'men' }"
        >
          Men's Team
        </div>
        <div
          class="subtitle"
          @click="selectTeam('juvenil')"
          :class="{ selected: selectedTeam === 'juvenil' }"
        >
          Handball juvenil
        </div>
      </div>
      <MatchesCategoryUser
        :fixturesData="selectedTeamFixtureData"
        :resultsData="selectedTeamResultsData"
        :isAdmin="isAdmin"
      ></MatchesCategoryUser>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/General/NavBar.vue";
import MatchesCategoryUser from "@/components/Matches/MatchesCategoryUser.vue";

export default {
  components: {
    Navbar,
    MatchesCategoryUser,
  },
  data() {
    return {
      menFixtureData: [
        {
          isHome: true,
          stadion: "Stadion Name 1",
          ora: "Match Time 2",
          team1Emblem: "../../assets/images/emblem.jpg",
          team2Emblem: "../../assets/images/emblem.jpg",
          currentDate: "July 2023",
        },
        {
          isHome: false,
          stadion: "Stadion Name 2",
          ora: "Match Time 2",
          team1Emblem: "../../assets/images/emblem.jpg",
          team2Emblem: "../../assets/images/emblem.jpg",
          currentDate: "March 2023",
        },
      ],
      menResultsData: [
        {
          stadion: "Stadion Name 1",
          ora: "Match Time 1",
          team1Emblem: "../../assets/images/emblem.jpg",
          team2Emblem: "../../assets/images/emblem.jpg",
          currentDate: "October 2023",
          team1Score: 1,
          team2Score: 2,
        },
        {
          stadion: "Stadion Name 2",
          ora: "Match Time 2",
          team1Emblem: "../../assets/images/emblem.jpg",
          team2Emblem: "../../assets/images/emblem.jpg",
          currentDate: "March 2023",
          team1Score: 1,
          team2Score: 2,
        },
      ],
      juvenilFixtureData: [
        {
          isHome: true,
          stadion: "Stadion Juvenil 2",
          ora: "Match Juvenil 2",
          team1Emblem: "../../assets/images/emblem.jpg",
          team2Emblem: "../../assets/images/emblem.jpg",
          currentDate: "July 2023",
        },
      ],
      juvenilResultsData: [
        {
          stadion: "Stadion Juvenil 1",
          ora: "Match Juvenil 1",
          team1Emblem: "../../assets/images/emblem.jpg",
          team2Emblem: "../../assets/images/emblem.jpg",
          currentDate: "October 2023",
          team1Score: 1,
          team2Score: 2,
        },
      ],
      selectedTeam: "men",
      isAdmin: true,
    };
  },
  computed: {
    selectedTeamFixtureData() {
      return this.selectedTeam === "men" ? this.menFixtureData : this.juvenilFixtureData;
    },
    selectedTeamResultsData() {
      return this.selectedTeam === "men" ? this.menResultsData : this.juvenilResultsData;
    },
  },
  methods: {
    selectTeam(team) {
      this.selectedTeam = team;
    },
  },
};
</script>

<style>
.containerTDR {
  height: auto;
  margin-top: 30vh;
}

.title {
  margin-top: 5vh;
  margin-bottom: 5vh;
  margin-left: 5vw;
}

.teams {
  display: flex;
  margin-left: 6vw;
}

.subtitle {
  flex-direction: column;
  margin-left: 2vw;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  opacity: 1;
}

.subtitle.selected {
  border-bottom: 3px solid red;
  opacity: 1;
}

.teams .subtitle:not(.selected) {
  opacity: 0.5;
}
</style>
