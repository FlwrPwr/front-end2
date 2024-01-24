<template>
  <div id="app">
<<<<<<< Updated upstream
    <div class="userActual">

    </div>
    <div class="baraTitlu">
      <div class="itemTitlu">Users</div>
      <button class="buttonTitlu">Add user</button>
      <div class="userActual">
        <div class="userInfo">
          <span>{{ currentUser.name }}</span> 
          <span>{{ currentUser.role }}</span>
=======
    <div class="userActual"></div>
    <div class="baraTitlu">
      <div class="itemTitlu">Users</div>
      <button class="buttonTitlu" @click="OpenAddUserModal">Add user</button>
      <div class="userActual">
        <div class="userInfo">
          <span>{{ currentUser.FirstName }} {{ currentUser.LastName }}</span>
          <span>{{ currentUser.Role }}</span>
>>>>>>> Stashed changes
        </div>
        <img src="../../assets/images/emblem.jpg" alt="User Icon" class="userIcon" />
      </div>
    </div>
<<<<<<< Updated upstream
    <div class="filters">
      <input type="text" placeholder="Search" v-model="searchTerm" @input="searchUsers">
      <select class="optiuniFiltru" v-model="selectedRole">
=======
    <div class="options row align-items-center mb-5">
      <div class="col-6">
        <input
          type="text"
          placeholder="Search"
          class="custom-multiselect"
          v-model="filter.SearchText"
          @keyup.enter="GetUsers()"
        />
      </div>
      <div class="col">
        <VueMultiselect
          id="status"
          v-model="filter.Status"
          :options="['Active', 'Inactive']"
          :close-on-select="true"
          @select="GetUsers"
          @remove="GetUsers"
          class="custom-multiselect"
          select-label=""
          placeholder="Select status"
        />
      </div>
      <div class="col">
        <VueMultiselect
          id="roles"
          v-model="filter.Role"
          :options="['Admin', 'User']"
          :close-on-select="true"
          @select="GetUsers"
          @remove="GetUsers"
          select-label=""
          placeholder="Select role"
        />
      </div>
      <!-- <select v-model="selectedRole">
>>>>>>> Stashed changes
        <option v-for="role in uniqueRoles" :key="role">{{ role }}</option>
      </select>
      <select class="optiuniFiltru" v-model="selectedStatus">
        <option v-for="status in uniqueStatus" :key="status">{{ status }}</option>
<<<<<<< Updated upstream
      </select>
    </div>
    <div class="baraTabel">
      <div class="itemBaraTabel" style="margin-left: 1vw;">Name</div>
=======
      </select> -->
    </div>
    <div class="baraTabel">
      <div class="itemBaraTabel" style="margin-left: 1vw">Name</div>
>>>>>>> Stashed changes
      <div class="itemBaraTabel" style="width: 80%">Email</div>
      <div class="itemBaraTabel">Phone number</div>
      <div class="itemBaraTabel" style="width: 30%">Active</div>
      <div class="itemBaraTabel" style="width: 30%">Role</div>
<<<<<<< Updated upstream
      <div class="itemBaraTabel" style="width: 40%; margin-right: 13vw;">Email status</div>
    </div>
    <div class="componentaTabel">
      <div class="linieTabel" v-for="(user, index) in filteredUsers" :key="user.email">
        <div class="itemTabel" style="width:16.8vw; margin-left: 1vw;">{{ user.name }}</div>
        <div class="itemTabel" style="width:19vw;">{{ user.email }}</div>
        <div class="itemTabel" style="width:16.8vw;">{{ user.phone }}</div>
        <div class="itemTabel" style="width:7vw;">{{ user.active ? 'Active' : 'Inactive' }}</div>
        <div class="itemTabel" style="width:7.5vw;">{{ user.role }}</div>
        <div class="itemTabel" style="width:8vw;">{{ user.verifiedEmail ? 'Verified' : 'Not Verified' }}</div>
        <div class="itemTabel" style="width:6vw;  justify-content: center;">
          <img src="../../assets/images/edit_icon.png" alt="User Icon" style="width: 24px; height: 22px;" />
        </div>
        <div class="itemTabel" style="width:6vw; justify-content: center;">
          <img src="../../assets/images/trash_icon.png" alt="User Icon" class="actionIcon" />
=======
      <div class="itemBaraTabel" style="width: 40%; margin-right: 13vw">Email status</div>
    </div>
    <div class="componentaTabel">
      <div class="linieTabel row align-items-center" v-for="(user, index) in users" :key="index">
        <div class="itemTabel ps-4" style="width: 16.3vw">
          {{ user.FirstName }} {{ user.LastName }}
        </div>
        <div class="itemTabel" style="width: 19.2vw; margin-left: 1vw">{{ user.Email }}</div>
        <div class="itemTabel" style="width: 16.8vw">{{ user.PhoneNumber }}</div>
        <div class="itemTabel" style="width: 7vw">{{ user.IsBlocked ? "Active" : "Inactive" }}</div>
        <div class="itemTabel" style="width: 7.5vw">{{ user.Role }}</div>
        <div class="itemTabel" style="width: 8vw">
          {{ user.EmailConfirmed ? "Verified" : "Not Verified" }}
        </div>
        <div class="itemTabel" style="width: 6vw; justify-content: center">
          <img
            src="../../assets/images/edit_icon.png"
            alt="User Icon"
            style="width: 24px; height: 22px; cursor: pointer"
            @click="GetUserDetails(user.Id)"
          />
        </div>
        <div class="itemTabel" style="width: 6vw; justify-content: center">
          <img
            src="../../assets/images/trash_icon.png"
            alt="User Icon"
            class="actionIcon"
            style="cursor: pointer"
            @click="DeleteUser(user.Id)"
          />
        </div>
        <div class="itemTabel" style="width: 1vw; justify-content: center">
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              v-model="user.IsBlocked"
              :class="{ 'switch-checked': user.IsBlocked }"
              type="checkbox"
              id="flexSwitchCheckDefault"
              @click="UpdateUserAccess(user.Id)"
            />
          </div>
>>>>>>> Stashed changes
        </div>
      </div>
    </div>
  </div>
<<<<<<< Updated upstream
</template>

<script>
export default {
  name: 'UserAdminView',
  data() {
    return {
      users: [
        {
          name: 'Florea Tudor - Dorin',
          email: 'floreatudordorin@gmail.com',
          phone: '+40747294111',
          active: true,
          role: 'Admin',
          verifiedEmail: true
        },
        {
          name: 'Pentilescu Emanuel',
          email: 'emanuel.pentilescu@gmail.com',
          phone: '+40747239646',
          active: true,
          role: 'Admin',
          verifiedEmail: true
        },
        {
          name: 'Dragoi Marius Andrei',
          email: 'andrei.dragoi@gmail.com',
          phone: '+40747111134',
          active: false,
          role: 'Editor',
          verifiedEmail: false
        },
      ],
      currentUser: {
        name: 'Florea Tudor - Dorin',
        role: 'Admin'
      },
      searchTerm: '',
      selectedRole: '',
      selectedStatus: '',
    };
  },
  computed: {
    filteredUsers() {
      return this.users
        .filter(user =>
          (this.selectedRole ? user.role === this.selectedRole : true) &&
          (this.selectedStatus
            ? (this.selectedStatus === 'Active' ? user.active : !user.active)
            : true) &&
          user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
=======
  <AddUserModal ref="addUser" @save="CreateUser"></AddUserModal>
  <EditUserModal ref="editUser" @edit="UpdateUser" :user="selectedUser"></EditUserModal>
</template>

<script>
import AddUserModal from "../../components/Users/AddUserModal.vue";
import EditUserModal from "../../components/Users/EditUserModal.vue";
export default {
  name: "UserAdminView",
  components: {
    AddUserModal,
    EditUserModal,
  },
  data() {
    return {
      users: [],
      selectedUser: {},
      searchTerm: "",
      selectedRole: "",
      selectedStatus: "",
      filter: {
        SearchText: "",
        Status: "",
        Role: "",
        OrderBy: "name",
        PageNumber: 1,
        PageSize: 20,
      },
      pagination: {},
    };
  },
  methods: {
    UpdateUserAccess(id) {
      self.$axios
        .put(`/api/User/changeUserAccess/${id}`, this.$store.state.auth.user)
        .then((response) => {
          self.GetUsers();
          self.$swal.fire("Success", `${response.data}`, "success");
        })
        .catch((error) => {
          self.$swal.fire("Error", `${error}`, "error");
        });
    },
    OpenAddUserModal() {
      this.$refs.addUser.ClearModal();
      $("#addUserModal").modal("show");
    },
    CreateUser(user) {
      this.$axios
        .post("/api/User/createUser", user)
        .then(() => {
          this.$utils.toastNotify("success", "User added successfully.");
          this.GetUsers();
          $("#addUserModal").modal("hide");
        })
        .catch(() => {
          this.$utils.toastNotify("error", "Something went wrong.");
        });
    },
    GetUserDetails(id) {
      this.$axios
        .get(`/api/User/getUser/${id}`)
        .then((response) => {
          this.selectedUser = response.data;
          $("#editUserModal").modal("show");
        })
        .catch(() => {
          this.$utils.toastNotify("error", "Something went wrong.");
        });
    },
    UpdateUser(user) {
      this.$axios
        .put("/api/User/updateUser", user)
        .then(() => {
          this.$utils.toastNotify("success", "User updated successfully.");
          this.GetUsers();
          $("#editUserModal").modal("hide");
        })
        .catch(() => {
          this.$utils.toastNotify("error", "Something went wrong.");
        });
    },
    DeleteUser(id) {
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
            this.$axios
              .delete(`/api/User/deleteUser/${id}`)
              .then(() => {
                this.GetUsers();
                this.$utils.toastNotify("success", "User deleted successfully.");
              })
              .catch(() => {
                this.$utils.toastNotify("error", "Something went wrong.");
              });
          }
        });
    },
    GetUsers() {
      this.filter.Role = !this.filter.Role ? "" : this.filter.Role;
      this.filter.Status = !this.filter.Status ? "" : this.filter.Status;
      this.filter.SearchText = !this.filter.SearchText ? "" : this.filter.SearchText;
      const searchParams = new URLSearchParams(this.filter);
      this.$axios
        .get(`/api/User/getAllUsers?${searchParams}`)
        .then((response) => {
          this.users = response.data.Items;
          this.pagination = response.data.PageDetails;
        })
        .catch(() => {
          this.$utils.toastNotify("error", "Something went wrong.");
        });
    },
  },
  computed: {
    filteredUsers() {
      return this.users
        .filter(
          (user) =>
            (this.selectedRole ? user.role === this.selectedRole : true) &&
            (this.selectedStatus
              ? this.selectedStatus === "Active"
                ? user.active
                : !user.active
              : true) &&
            user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
>>>>>>> Stashed changes
        )
        .sort((a, b) => {
          if (a.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())) return -1;
          if (b.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())) return 1;
          return 0;
        });
    },
<<<<<<< Updated upstream
    uniqueRoles() {
      return Array.from(new Set(this.users.map(user => user.role)));
    },
    uniqueStatus() {
      return Array.from(new Set(this.users.map(user => (user.active ? 'Active' : 'Inactive'))));
    },
  },
  methods: {
    searchUsers() {
    },
=======
    currentUser() {
      return this.$store.state.auth.user;
    },
    uniqueRoles() {
      return Array.from(new Set(this.users.map((user) => user.role)));
    },
    uniqueStatus() {
      return Array.from(new Set(this.users.map((user) => (user.active ? "Active" : "Inactive"))));
    },
  },
  created() {
    this.GetUsers();
>>>>>>> Stashed changes
  },
};
</script>

<style scoped>
<<<<<<< Updated upstream
=======
.modal-content .custom-multiselect .multiselect__placeholder {
  font-size: 16px;
  padding-top: 0px;
  margin-bottom: 0px;
  font-weight: 400;
  color: var(--neutral-5);
}
.modal-content .custom-multiselect .multiselect__tags {
  border: 1px solid var(--neutral-3);
  border-radius: 8px;
  height: 48px;
  padding: 12px 40px 0 10px;
}
.modal-content .custom-multiselect .multiselect__single {
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  color: var(--neutral-8);
}
.modal-content .custom-multiselect .multiselect__input {
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  color: var(--neutral-8);
}

.custom-multiselect .multiselect__option--highlight {
  background: #f8f9fa;
  color: var(--neutral-5);
}

.custom-multiselect .multiselect__option {
  min-height: 30px;
}

.custom-multiselect .multiselect__option--selected:after {
  content: "" !important;
}

.custom-multiselect .multiselect__option--selected {
  font-weight: 600 !important;
  color: var(--neutral-7) !important;
  background-color: transparent !important;
}

.custom-multiselect .multiselect__select:before {
  border-top: 0px;
  float: right;
  line-height: 1.063;
  right: -2px;
  top: 10%;
}

.custom-multiselect.multiselect--disabled {
  cursor: not-allowed !important;
  pointer-events: all;
}

.custom-multiselect.multiselect--disabled .multiselect__tags {
  background-color: var(--neutral-2) !important;
  color: var(--neutral-4);
}

.custom-multiselect.multiselect--disabled .multiselect__select {
  background-color: transparent !important;
}

.custom-multiselect ::-webkit-scrollbar-thumb:hover {
  background: var(--blacktint-1);
}

.custom-multiselect ::-webkit-scrollbar {
  width: 3px;
  height: 6px;
}

/* Track */
.custom-multiselect ::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
.custom-multiselect ::-webkit-scrollbar-thumb {
  background: #adb5bd;
  border-radius: 3px;
}

/* Handle on hover */
.custom-multiselect ::-webkit-scrollbar-thumb:hover {
  background: var(--blacktint-1);
}
.custom-multiselect {
  cursor: pointer;
}

.custom-multiselect .multiselect__placeholder {
  padding-top: 0px;
  margin-bottom: 0px;
  font-weight: 400;
  color: var(--neutral-5);
}

.custom-multiselect .multiselect__tags {
  border: 1px solid var(--neutral-3);
  border-radius: 8px;
  height: 45px;
  padding: 12px 40px 0 8px;
}

.custom-multiselect .multiselect__single {
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: var(--neutral-8);
}

.custom-multiselect .multiselect__input {
  font-size: 14px;
  font-weight: 400;
  line-height: 21px;
  color: var(--neutral-8);
}

.custom-multiselect.lg .multiselect__single {
  font-size: 16px;
}

.custom-multiselect.lg .multiselect__input {
  font-size: 16px;
}

.custom-multiselect.lg .multiselect__tags {
  height: 48px;
  padding: 12px 40px 0 10px;
}

.custom-multiselect.lg .multiselect__placeholder {
  font-size: 16px;
}

.custom-multiselect .multiselect__content-wrapper {
  border: 1px solid transparent;
  box-shadow: 0px 10px 30px -10px #00000026;
  border-radius: 8px;
}

.custom-multiselect .multiselect__option {
  line-height: 30px;
  color: var(--neutral-5);
  font-size: 14px;
  padding: 0px 15px;
  margin: 7px 0px;
}
>>>>>>> Stashed changes
#app {
  margin-top: 180px;
  font-family: Arial, sans-serif;
  height: auto;
}

<<<<<<< Updated upstream
.userInfo{
=======
.userInfo {
>>>>>>> Stashed changes
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 1.1rem;
  padding-block: 1.5vh;
<<<<<<< Updated upstream
  padding-inline:1vw;
=======
  padding-inline: 1vw;
>>>>>>> Stashed changes
  border-left: 1px solid grey;
}

.userIcon {
<<<<<<< Updated upstream
  width: 75px; 
  height: 75px; 
=======
  width: 75px;
  height: 75px;
>>>>>>> Stashed changes
  margin-right: 5px;
  margin-top: 2.5px;
  border-radius: 100%;
}

<<<<<<< Updated upstream

.userActual
{
  display: flex;
  flex-direction: row;
  margin-right:2vw;
}

.linieTabel {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid grey;
  height: 8vh;
  justify-content: left;
=======
.userActual {
  display: flex;
  flex-direction: row;
  margin-right: 2vw;
}

.linieTabel {
  border-bottom: 1px solid grey;
  height: 8vh;
>>>>>>> Stashed changes
}

.componentaTabel {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-inline: 5vw;
  font-weight: bold;
}

<<<<<<< Updated upstream
.itemTabel {
  display: flex;
  padding-block: 2.5vh;
}

=======
>>>>>>> Stashed changes
.itemTitlu {
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: 3rem;
  margin-left: 5vw;
}

.baraTitlu {
  display: flex;
  width: 100%;
  height: 80px;
  flex-direction: row;
  justify-content: space-between;
  background-color: #8689ba;
}

<<<<<<< Updated upstream
=======
.switch-checked {
  background-color: #8689ba;
  color: #8689ba;
}
>>>>>>> Stashed changes
.buttonTitlu {
  display: flex;
  width: 110px;
  height: 50px;
  border-radius: 20px;
  justify-content: center;
  margin-block: 2vh;
  margin-left: 55vw;
}

.itemBaraTabel {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 70%;
}

.baraTabel {
  display: flex;
  flex-direction: row;
  width: 90%;
  height: 8vh;
  margin-inline: 5vw;
  justify-content: left;
  border-bottom: 1px solid grey;
  border-top: 1px solid grey;
  font-weight: bold;
  font-size: 1.2rem;
  padding-block: 2.5vh;
}

.filters {
  display: flex;
  justify-content: space-between;
  margin: 20px 0;
  width: 90%;
  height: 5vh;
  margin-inline: 5vw;
}

<<<<<<< Updated upstream
=======
.options {
  margin: 20px 0;
  width: 90%;
  height: 5vh;
  margin-inline: 5vw;
}
>>>>>>> Stashed changes

.optiuniFiltru {
  display: flex;
  border-radius: 20px;
  margin-inline: 0.5vw;
  width: 5vw;
}
</style>
