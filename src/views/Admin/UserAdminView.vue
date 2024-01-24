<template>
  <div id="app">
    <div class="userActual">

    </div>
    <div class="baraTitlu">
      <div class="itemTitlu">Users</div>
      <button class="buttonTitlu">Add user</button>
      <div class="userActual">
        <div class="userInfo">
          <span>{{ currentUser.name }}</span> 
          <span>{{ currentUser.role }}</span>
        </div>
        <img src="../../assets/images/emblem.jpg" alt="User Icon" class="userIcon" />
      </div>
    </div>
    <div class="filters">
      <input type="text" placeholder="Search" v-model="searchTerm" @input="searchUsers">
      <select class="optiuniFiltru" v-model="selectedRole">
        <option v-for="role in uniqueRoles" :key="role">{{ role }}</option>
      </select>
      <select class="optiuniFiltru" v-model="selectedStatus">
        <option v-for="status in uniqueStatus" :key="status">{{ status }}</option>
      </select>
    </div>
    <div class="baraTabel">
      <div class="itemBaraTabel" style="margin-left: 1vw;">Name</div>
      <div class="itemBaraTabel" style="width: 80%">Email</div>
      <div class="itemBaraTabel">Phone number</div>
      <div class="itemBaraTabel" style="width: 30%">Active</div>
      <div class="itemBaraTabel" style="width: 30%">Role</div>
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
        </div>
      </div>
    </div>
  </div>
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
        )
        .sort((a, b) => {
          if (a.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())) return -1;
          if (b.name.toLowerCase().startsWith(this.searchTerm.toLowerCase())) return 1;
          return 0;
        });
    },
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
  },
};
</script>

<style scoped>
#app {
  margin-top: 180px;
  font-family: Arial, sans-serif;
  height: auto;
}

.userInfo{
  display: flex;
  flex-direction: column;
  font-weight: bold;
  font-size: 1.1rem;
  padding-block: 1.5vh;
  padding-inline:1vw;
  border-left: 1px solid grey;
}

.userIcon {
  width: 75px; 
  height: 75px; 
  margin-right: 5px;
  margin-top: 2.5px;
  border-radius: 100%;
}


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
}

.componentaTabel {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin-inline: 5vw;
  font-weight: bold;
}

.itemTabel {
  display: flex;
  padding-block: 2.5vh;
}

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


.optiuniFiltru {
  display: flex;
  border-radius: 20px;
  margin-inline: 0.5vw;
  width: 5vw;
}
</style>
