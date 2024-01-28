<template>
  <div class="contentDiv">
    <div class="imagineTeren">
      <img src="../../assets/images/teren.png" alt="Teren" class="imgTeren"/>
      <div 
     id="dot-1" 
     :class="{ 'dot-large': selectedGroup === 'Portari', 'dot-medium': selectedGroup !== 'Portari' }">
</div>
<div 
     id="dot-2" 
     :class="{ 'dot-large': selectedGroup === 'Fundasi', 'dot-medium': selectedGroup !== 'Fundasi' }">
</div>
<div 
     id="dot-3" 
     :class="{ 'dot-large': selectedGroup === 'Centrali', 'dot-medium': selectedGroup !== 'Centrali' }">
</div>
<div 
     id="dot-4" 
     :class="{ 'dot-large': selectedGroup === 'Atacanti', 'dot-medium': selectedGroup !== 'Atacanti' }">
    </div>


      
    </div>
    <div class="listaJucatori">
      <div>
        <div class="classElementsType">
          <div class="empltyElementPlayer"></div>
          <div class="positionTypePlayer row ms-3 align-items-center">
            <div class="col">{{ selectedGroup }}</div>
           
          </div>
        </div>
        <div
          v-for="(player, index) in players"
          :key="index"
          @mouseover="GetPlayerInfo(player)"
          @mouseout="GetPlayerInfo()"
        >
          <div class="contentJucator row">
            <div class="numarJucator col-auto">
              {{ player.Number }}
            </div>
            <div class="numeJucator col">
              {{ player.FirstName + " " + player.LastName }}
            </div>
            
          </div>
        </div>
      </div>
    </div>
    <div class="imagineJucator">
      <div v-if="hoverPlayer">
        <img class="imagineJucator" :src="$utils.GetImageFormat(hoverPlayer.ImgBase64)" />
        <div class="imgTxt">{{ hoverPlayer.FirstName + " " + hoverPlayer.LastName }}</div>
      </div>
    </div>
  </div>
  <AddPlayerModal
    ref="addPlayerModalRef"
    :position="selectedGroup"
    @get="$emit('get', selectedGroup)"
  ></AddPlayerModal>
  <EditPlayerModal
    ref="editPlayerModalRef"
    :player="selectedPlayer"
    @get="$emit('get', selectedGroup)"
  ></EditPlayerModal>
</template>

<script>
import AddPlayerModal from "./Modals/AddPlayerModal.vue";
import EditPlayerModal from "./Modals/EditPlayerModal.vue";
export default {
  name: "GroupPlayers",
  emits: ["get"],
  props: {
    selectedGroup: {
      type: String,
      default: "Atacanti",
    },
    players: {
      type: Array,
    },
  },
  components: {
    AddPlayerModal,
    EditPlayerModal,
  },
  data() {
    return {
      hoveredImage: "",
      hoverPlayer: {},
      selectedPlayer: {},
    };
  },
  methods: {
    GetPlayerInfo(player) {
      this.hoverPlayer = player;
    },
    OpenAddPlayerModal() {
      this.$refs.addPlayerModalRef.ClearModal();
      $("#addPlayerModal").modal("show");
    },
    GetPlayerDetails(id) {
      this.$axios
        .get(`/api/Player/get/${id}`)
        .then((response) => {
          this.selectedPlayer = response.data;
          this.$refs.editPlayerModalRef.ClearModal();
          $("#editPlayerModal").modal("show");
        })
        .catch(() => {
          this.$swal.fire("Something went wrong", "", "error");
        });
    },
    DeletePlayer(id) {
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
            this.$axios.put(`/api/Player/deleteVirtual/${id}`).then(() => {
              this.$emit("get", this.selectedGroup);
              this.$swal.fire("Player has been deteleted succesfully", "", "success");
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.dot-large {
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 50%;
  background-color: red;
  left: 50%; 
  transform: translateX(-50%);
}
.dot-medium {
  width: 10px; 
  height: 10px;
  position: absolute;
  border-radius: 50%;
  background-color: red;
  left: 50%; 
  transform: translateX(-50%);

}
.playerEdits {
  border-left: none;
  border-top: 0.2rem solid gray;
}
.contentJucator {
  font-size: 2rem;
  margin: 0;
  padding: 0;
}

.numarJucator {
  border-right: 0.2rem solid gray;
  border-top: 0.2rem solid gray;
  width: 10%;
  box-sizing: border-box;
}

.numeJucator {
  padding-inline: 1vw;
  border-top: 0.2rem solid gray;
  width: 40vw;
  box-sizing: border-box;
  border-left: none;
}

.contentDiv {
  display: flex;
  justify-content: space-between;

  height: 60vh;
}

.imagineTeren {
  position: relative;
  width:18vw;
  display: flex;
  align-items: center;
  margin: 1vw;
  place-items: center;
}
.imgTeren
{
  max-width: 100%;
  max-height: 100%;
}


#dot-1 { top: 20%; } 
#dot-2 { top: 30%; } 
#dot-3 { top: 45%; } 
#dot-4 { top: 60%; }
.imagineJucator {
  margin: 1vw;
  width: 30vw;
  height: 100%;
  display: flex;
  align-items: center;

}
.imgTxt{

  text-align: center;
  
}

.empltyElementPlayer {
  width: 10%;
  border-right: 0.2rem solid gray;
}

.positionTypePlayer {
  font-size: 3rem;
  color: grey;
  width: 90%;
  margin-top: 8vh;
  margin-bottom: 4vh;
}

.classElementsType {
  display: flex;
}
</style>
