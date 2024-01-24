<template>
  <div class="topBar row align-items-center btn-overlay">
    <div class="col">
      <h5>Sponsori/Parteneri</h5>
    </div>
    <div class="col-auto">
      <button class="btn btn-success" @click="OpenAddSponsorModal">Add new sponsor</button>
    </div>
  </div>
  <div class="sponsorItems row">
    <div
      v-for="(sponsor, index) in sponsors"
      :key="index"
      class="col-auto sponsorDiv"
      @click="RedirectTo(sponsor.Link)"
    >
      <div class="row align-items-center">
        <div class="col">
          <img :src="$utils.GetImageFormat(sponsor.ImgBase64)" />
        </div>
        <div class="col">
          <div class="row align-items-center">
            <div class="titleDiv col">
              {{ sponsor.Name }}
            </div>
            <div class="col-auto">
              <div class="mb-2">
                <font-awesome-icon
                  :icon="['fas', 'pen-to-square']"
                  size="xl"
                  @click.stop="GetSponsor(sponsor.Id)"
                />
              </div>
              <div class="mb-2">
                <font-awesome-icon
                  :icon="['far', 'trash-can']"
                  size="xl"
                  @click.stop="DeleteSponsor(sponsor.Id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <AddSponsorModal ref="addSponsor" @create="AddSponsor"></AddSponsorModal>
  <EditSponsorModal @edit="EditSponsor" :sponsor="sponsor"></EditSponsorModal>
</template>

<script>
import AddSponsorModal from "../../components/Sponsors/Modals/AddSponsorModal.vue";
import EditSponsorModal from "../../components/Sponsors/Modals/EditSponsorModal.vue";
export default {
  name: "TableComponentSponsor",
  components: {
    AddSponsorModal,
    EditSponsorModal,
  },
  data() {
    return {
      sponsors: [],
      filter: {
        SearchQuery: "",
        PageNumber: 1,
        PageSize: 10,
      },
      pagination: {},
      sponsor: {},
    };
  },
  methods: {
    RedirectTo(link) {
      window.open(link, "_blank");
    },
    DeleteSponsor(id) {
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
            this.$axios.delete(`/api/Sponsor/delete/${id}`).then(() => {
              this.GetSponsors();
              this.$swal.fire("Sponsor deteleted succesfully", "", "success");
            });
          }
        });
    },
    OpenAddSponsorModal() {
      this.$refs.addSponsor.ClearModal();
      $("#addSponsorModal").modal("show");
    },
    GetSponsor(id) {
      this.$axios
        .get(`/api/Sponsor/get/${id}`)
        .then((response) => {
          this.sponsor = response.data;
          $("#editSponsorModal").modal("show");
        })
        .catch((error) => {
          this.$swal.fire("Error", "Something went wrong", "error");
        });
    },
    AddSponsor(sponsor) {
      this.$axios
        .post(`/api/Sponsor/create`, sponsor)
        .then(() => {
          this.$swal.fire("Success", "Sponsor added succesfully", "succes");
          this.GetSponsors();
          $("#addSponsorModal").modal("hide");
        })
        .catch((error) => {
          this.$swal.fire("Error", "Something went wrong", "error");
        });
    },
    EditSponsor(sponsor) {
      this.$axios
        .put(`/api/Sponsor/update/${sponsor.Id}`, sponsor)
        .then(() => {
          this.$swal.fire("Success", "Sponsor added succesfully", "succes");
          this.GetSponsors();
          $("#editSponsorModal").modal("hide");
        })
        .catch((error) => {
          this.$swal.fire("Error", "Something went wrong", "error");
        });
    },
    GetSponsors() {
      const searchParams = {
        ...(this.filter.SearchQuery ? { SearchQuery: this.filter.SearchQuery } : ""),
        PageNumber: this.filter.PageNumber,
        PageSize: this.filter.PageSize,
      };
      this.$axios
        .get(`/api/Sponsor/getAll?${new URLSearchParams(searchParams)}`)
        .then((response) => {
          this.sponsors = response.data.Items;
          console.log(this.sponsors);
          this.pagination = response.data.PageDetails;
        })
        .catch(() => {
          console.log("error");
        });
    },
  },
  created() {
    this.GetSponsors();
  },
};
</script>

<style scoped>
.sponsorDiv {
  display: flex;
  align-items: center;
  background-color: rgb(236, 224, 224);
  height: 12rem;
  width: 30rem;
  margin: 1rem;
  border: 1px solid black;
  border-radius: 10px;
}

img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 10px;
}

.dataDiv {
  display: flex;
  flex-direction: column;
  justify-content: start;

  width: 21rem;
  height: 11rem;
  padding: 1rem;
}

.titleDiv {
  font-weight: bold;
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.topBar {
  margin: 1vh;
  border-bottom: 1px solid black;
  margin-top: 3rem;
  padding-top: 6%;
  padding-bottom: 10px;
}

.sponsorItems {
  cursor: pointer;
}

.btn-overlay {
  margin-top: 16vh;
}
</style>
