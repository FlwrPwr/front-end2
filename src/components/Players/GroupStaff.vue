<template>
    <div class="contentDiv">
      <div class="imagineTeren">
        <img src="../../assets/images/teren.png" alt="Teren">
      </div>
      <div class="listaJucatori">
        <div>
          <div class="classElementsType">
            <div class="empltyElementPlayer"></div>
            <div class="positionTypePlayer row ms-3 align-items-center">
              <div class="col">{{ selectedGroup }}</div>
              <div class="col">
                <button class="btn btn-success p-2" @click="OpenAddStaffModal">Adauga {{ selectedGroup.toLowerCase() }}</button>
              </div>
            </div>
          </div>
          <div v-for="(member, index) in staff" :key="index" @mouseover="GetPlayerInfo(member)"
            @mouseout="GetPlayerInfo()">
            <div class="contentJucator row">
              <div class="numarJucator col-auto">
                {{ member.Number }}
              </div>
              <div class="numeJucator col">
                {{ member.FirstName + ' ' + member.LastName }}
              </div>
              <div class="col-auto playerEdits">
                <font-awesome-icon :icon="['fas', 'user-pen']" size="xs" @click="GetMemberDetails(member.Id)"/>
              </div>
              <div class="col-auto playerEdits">
                <font-awesome-icon :icon="['fas', 'eraser']" size="xs" @click="DeleteStaff(member.Id)"/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="imagineJucator">
        <div v-if="hoverPlayer">
          <img class="imagineJucator" :src="$utils.GetImageFormat(hoverPlayer.ImgBase64)">
  
        </div>
      </div>
    </div>

    <AddStaffModal ref="addStaffModalRef" :role="selectedGroup" @get="$emit('get', selectedGroup)"></AddStaffModal>
    <EditStaffModal ref="editStaffModalRef" :member="selectedMember" @get="$emit('get', selectedGroup)"></EditStaffModal>
  </template>
  
  <script>
  import AddStaffModal from './Modals/AddStaffModal.vue';
  import EditStaffModal from './Modals/EditStaffModal.vue';
  export default {
    name: 'GroupPlayers',
    emits: ['get'],
    props: {
      selectedGroup: {
        type: String,
        default: 'Atacanti'
      },
      staff: {
        type: Array,
      }
    },
    components: {
        AddStaffModal,
        EditStaffModal,
    },
    data() {
      return {
        hoveredImage: '',
        hoverPlayer: {},
        selectedMember: {},
      };
    },
    methods: {
      GetPlayerInfo(member) {
        this.hoverPlayer = member;
      },
      OpenAddStaffModal() {
        this.$refs.addStaffModalRef.ClearModal();
        $('#addStaffModal').modal('show')
      },
      GetMemberDetails(id) {
        this.$axios.get(`/api/Staff/get/${id}`).then((response) => {
          this.selectedMember = response.data;
          this.$refs.editStaffModalRef.ClearModal();
          $('#editStaffModal').modal('show')
        }).catch(() => {
          this.$swal.fire('Something went wrong', '', 'error');
        })
      },
      DeleteStaff(id){
        this.$swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.$axios.put(`/api/Staff/deleteVirtual/${id}`).then(() => {
              this.$swal.fire('Player has been deteleted succesfully', '', 'success');
            })
          }
        });
      }
    },
  };
  </script>
  
    
  <style scoped>
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
    width: 90%;
    box-sizing: border-box;
    border-left: none;
  }
  
  .contentDiv {
    display: flex;
    justify-content: space-between;
  
    height: 60vh;
  }
  
  .imagineTeren {
    width: 15vw;
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  
  .imagineJucator {
    margin-left: 10px;
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
  }
  
  .imagineJucator>img {
    height: 100%;
    width: auto
  }
  
  .imagineTeren>img {
    height: 50vh;
    width: 100%;
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
    