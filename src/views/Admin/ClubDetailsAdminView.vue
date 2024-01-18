<template>
  <div class="club-details">
    <div class="background-image">
      <img src="@/assets/images/clubDetailsImage.png" class="image" alt="Club Details Image" />
    </div>
    <div class="subtitle-row">
      <div
        class="subtitle"
        :class="{ active: selectedSubtitle === 'clubDetails' }"
        @click="showClubDetails"
      >
        Detalii club
      </div>
      <div
        class="subtitle"
        :class="{ active: selectedSubtitle === 'trophys' }"
        @click="showTrophys"
      >
        Trofee
      </div>
    </div>
    <div class="m-5">
      <div v-if="selectedSubtitle === 'clubDetails'">
        <div class="row align-items-center">
          <div class="col ms-5 ps-5"><h2>Detalii club</h2></div>
          <div class="col-auto me-5 pe-5">
            <button class="btn btn-success" @click="SaveChanges">Save changes</button>
          </div>
        </div>
        <div class="m-5 p-5 mt-0">
          <Editor v-model="details.Content" class="border rounded" />
        </div>
      </div>
      <div v-if="selectedSubtitle === 'trophys'">
        <div class="trophysContent">
          <div class="trophysTitle">Perfomante interne</div>
          <div class="trophysBoxContainer">
            <div class="trophysBox">
              <ClubDetailsTrophys
                :trophyImage="trophyImage"
                :trophyYear="trophyYear"
              ></ClubDetailsTrophys>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClubDetailsTrophys from "@/components/ClubDetailsTrophys.vue";
import Editor from "../../components/News/Editor.vue";
export default {
  components: {
    ClubDetailsTrophys,
    Editor,
  },
  data() {
    return {
      selectedSubtitle: "clubDetails",
      trophyImage: "@/assets/images/search_icon.png",
      trophyYear: "2022",
      details: {
        Content: "",
      },
    };
  },
  methods: {
    showClubDetails() {
      this.selectedSubtitle = "clubDetails";
    },
    showTrophys() {
      this.selectedSubtitle = "trophys";
    },
    GetClubDetails() {
      this.$axios
        .get("/api/ClubDetails/get")
        .then((response) => {
          this.details = response.data;
        })
        .catch(() => {
          this.$swal.fire("Error", "Something went wrong", "error");
        });
    },
    SaveChanges() {
      this.$axios
        .put(`/api/ClubDetails/edit?content=${this.details.Content}`)
        .then(() => {
          this.$swal.fire("Success", "Club details have been saved", "success");
        })
        .catch(() => {
          this.$swal.fire("Error", "Something went wrong", "error");
        });
    },
  },
  created() {
    this.GetClubDetails();
  },
};
</script>

<style scoped>
.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.background-image {
  width: 100%;
  height: 100%;
  z-index: -1;
  background-color: red;
}
.club-details {
  height: auto;
  padding-top: 6%;
}
.subtitle-row {
  margin-top: 2vh;
  height: 10vh;
  display: flex;
  border-bottom: 2px solid grey;
}

.subtitle {
  cursor: pointer;
  align-self: center;
  margin-left: 5vw;
}

.subtitle.active {
  font-weight: bold;
  border-bottom: 2px solid red;
}

.subtitle:not(.active) {
  color: grey;
}

.content {
  margin-top: 8vh;
}

.visionContent {
  margin-left: 15vw;
  margin-right: 15vw;
  margin-bottom: 10vh;
}

.historyContent {
  margin-left: 15vw;
  margin-right: 15vw;
  margin-bottom: 10vh;
}

.trophysContent {
  margin-bottom: 10vh;
  background-color: #e7f2fd;
  height: 60vh;
  width: 100%;
  padding-left: 20vh;
}

.trophysTitle {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10vh;
  padding-top: 3vh;
  padding-left: 2vw;
}

.trophysContainer {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
</style>
