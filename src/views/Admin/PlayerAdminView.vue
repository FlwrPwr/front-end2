<template>
  <div class="menueBar mt-4">
    <div class="playerCoach">
      <div class="jucatoriTab" @click="showPlayerPosition" :class="{ selectedTab: showPlayers }">
        Jucatori
      </div>
      <div class="staffTab" @click="showStaffInfo" :class="{ selectedTab: !showPlayers }">
        Staff
      </div>
    </div>
    <div class="playerPosition" v-show="showPlayers">
      <div class="atacantiTab" @click="GetPlayersByPosition('Atacanti')">Atacanti</div>
      <div class="centraliTab" @click="GetPlayersByPosition('Centrali')">Centrali</div>
      <div class="fundasiTab" @click="GetPlayersByPosition('Fundasi')">Fundasi</div>
      <div class="portariTab" @click="GetPlayersByPosition('Portari')">Portari</div>
    </div>
    <div class="staffInfo" v-show="!showPlayers">
      <div class="antrenorTab" @click="GetStaffByRole('Antrenori')">Antrenori</div>
      <div class="antrenorTab" @click="GetStaffByRole('Doctori')">Doctori</div>
      <div class="antrenorTab" @click="GetStaffByRole('Kinetoterapeuti')">Kinetoterapeuti</div>
      <div class="antrenorTab" @click="GetStaffByRole('Maseuri')">Maseuri</div>
      <div class="antrenorTab" @click="GetStaffByRole('Manageri')">Manageri</div>
    </div>
  </div>
  <GroupPlayers
    v-if="showPlayers"
    :selectedGroup="selectedGroup"
    :players="players"
    @get="GetPlayersByPosition"
  ></GroupPlayers>
  <GroupStaff
    v-else
    :selectedGroup="selectedGroup"
    :staff="staff"
    @get="GetStaffByRole"
  ></GroupStaff>
</template>

<script>
import GroupPlayers from "../../components/Players/GroupPlayers.vue";
import GroupStaff from "../../components/Players/GroupStaff.vue";
export default {
  components: {
    GroupPlayers,
    GroupStaff,
  },
  data() {
    return {
      showPlayers: true,
      showStaffInfoContent: false,
      selectedGroup: "Atacanti",
      players: [],
      staff: [],
    };
  },
  methods: {
    showPlayerPosition() {
      this.showPlayers = true;
      this.selectedGroup = "Atacanti";
      this.GetPlayersByPosition(this.selectedGroup);
    },
    showStaffInfo() {
      this.showPlayers = false;
      this.selectedGroup = "Antrenori";
      this.GetStaffByRole(this.selectedGroup);
    },
    GetPlayersByPosition(group) {
      const searchParam = {
        Position: group,
      };
      this.$axios
        .get(`/api/Player/getAll?${new URLSearchParams(searchParam)}`)
        .then((response) => {
          this.players = response.data.Items;
          this.selectedGroup = group;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    GetStaffByRole(group) {
      const searchParam = {
        Role: group,
      };
      this.$axios
        .get(`/api/Staff/getAll?${new URLSearchParams(searchParam)}`)
        .then((response) => {
          this.staff = response.data.Items;
          this.selectedGroup = group;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.GetPlayersByPosition("Atacanti");
  },
};
</script>
<style scoped>
.selectedTab {
  text-decoration: underline;
  text-decoration-color: red;
}

.playerCoach {
  display: flex;
  font-size: 2rem;
  margin-top: 5vh;
  width: 15vw;
  justify-content: center;
}

.playerPosition,
.staffInfo {
  display: flex;
  font-size: 1.5rem;
  margin-top: 5vh;
  padding-left: 6vw;
  color: grey;
}

.menueBar {
  display: flex;
  border-bottom: 0.2rem solid gray;
  padding-top: 6%;
}

.jucatoriTab,
.staffTab,
.atacantiTab,
.centraliTab,
.fundasiTab,
.portariTab,
.antrenorTab {
  margin-inline: 1rem;
  flex-direction: column;
  justify-content: flex-end;
  display: flex;
}

.jucatoriTab:hover,
.staffTab:hover {
  text-decoration: underline;
  cursor: pointer;
  text-decoration-color: rgb(243, 89, 89);
}

.atacantiTab:hover,
.centraliTab:hover,
.fundasiTab:hover,
.portariTab:hover,
.antrenorTab:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
