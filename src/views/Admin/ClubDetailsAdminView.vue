<template>
  <div class="club-details">
    <div class="background-image">
      <img src="@/assets/images/clubDetailsImage.png" class="image" alt="Club Details Image" />
    </div>
    <div class="subtitle-row">
      <div class="subtitle" :class="{ active: selectedSubtitle === 'clubDetails' }" @click="showClubDetails">
        Detalii club
      </div>
      <div class="subtitle" :class="{ active: selectedSubtitle === 'trophys' }" @click="showTrophys">
        Trofee
      </div>
    </div>
    <div class="m-5">
      <div v-if="selectedSubtitle === 'clubDetails'">
        <div class="row align-items-center">
          <div class="col ms-5 ps-5">
            <h2>Detalii club</h2>
          </div>
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
            <div class="trophysBox" v-for="(trophy, index) in trophies" :key="index">
              <div class="trophy-box">
                <img :src="trophy.ImgBase64" class="trophy-image" />
                <div class="trophy-year">{{ trophy.Name }}</div>
                <div class="trophy-year">{{ trophy.Date }}</div>
                <div class="trophy-actions">
                  <button class="action-button" @click="GetTrophy(trophy.Id)">Edit</button>
                  <button class="action-button" @click="DeleteTrophy(trophy.Id)">Delete</button>
                </div>
              </div>
            </div>
            <div class="addTrophysButton" @click="OpenAddTrophyModal">+</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddTrophyModal ref="addTrophy" @create="CreateTrophy"></AddTrophyModal>
  <EditTrophyModal @edit="EditTrophy" :trophy="selectedTrophy"></EditTrophyModal>
</template>

<script>
import AddTrophyModal from "../../components/ClubDetails/Modals/AddTrophyModal.vue";
import EditTrophyModal from "../../components/ClubDetails/Modals/EditTrophyModal.vue";
import Editor from "../../components/News/Editor.vue";
export default {
  components: {
    Editor,
    AddTrophyModal,
    EditTrophyModal,
  },
  data() {
    return {
      details: {},
      selectedSubtitle: "trophys",
      trophies: [],
      selectedTrophy: {},
      filter: {
        PageNumber: 1,
        PageSize: 20,
        SearchQuery: "",
      },
    };
  },
  methods: {
    EditTrophy(trophy) {
      this.$axios
        .put(`/api/Trophies/edit/${trophy.Id}`, trophy)
        .then(() => {
          this.$swal.fire("Success", "Trophy edited succesfully", "success");
          this.GetTrophies();
          $("#editTrophyModal").modal("hide");
        })
        .catch(() => {
          this.$swal.fire("Error", "Something went wrong", "error");
        });
    },
    CreateTrophy(trophy) {
      this.$axios
        .post("/api/Trophies/create", trophy)
        .then(() => {
          this.$swal.fire("Success", "Trophy added succesfully", "success");
          this.GetTrophies();
          $("#addTrophyModal").modal("hide");
        })
        .catch(() => {
          this.$swal.fire("Error", "Something went wrong", "error");
        });
    },
    GetTrophy(id) {
      this.$axios
        .get(`/api/Trophies/get/${id}`)
        .then((response) => {
          this.selectedTrophy = response.data;
          $("#editTrophyModal").modal("show");
        })
        .catch(() => {
          this.$swal.fire("Error", "Something went wrong", "error");
        });
    },
    GetTrophies() {
      const searchParams = {
        ...(this.filter.SearchQuery ? { SearchQuery: this.filter.SearchQuery } : ""),
        PageNumber: this.filter.PageNumber,
        PageSize: this.filter.PageSize,
      };
      this.$axios
        .get(`/api/Trophies/getAll?${new URLSearchParams(searchParams)}`)
        .then((response) => {
          this.trophies = response.data.Items;
          this.pagination = response.data.PageDetails;
        })
        .catch(() => {
          this.$swal.fire("Error", "Something went wrong", "error");
        });
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
    DeleteTrophy(id) {
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$axios.put(`/api/Trophies/deleteVirtual/${id}`).then(() => {
              this.GetTrophies();
              this.$swal.fire("Trophy deteleted succesfully", "", "success");
            });
          }
        });
    },
    OpenAddTrophyModal() {
      this.$refs.addTrophy.ClearModal();
      $("#addTrophyModal").modal("show");
    },
    showClubDetails() {
      this.selectedSubtitle = "clubDetails";
      this.GetClubDetails();
    },
    showTrophys() {
      this.selectedSubtitle = "trophys";
      this.GetTrophies();
    },
  },
  created() {
    this.GetClubDetails();
    this.GetTrophies();
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
  padding-top: 4.5%;
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

.trophysBoxContainer {
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
}

.addTrophysButton {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 5rem;
  font-weight: bold;
  background-color: #ccc;
  margin-left: 2vw;
  height: 10vh;
  width: 5vw;
  border-radius: 100%;
  padding-bottom: 2vh;
}
</style>
