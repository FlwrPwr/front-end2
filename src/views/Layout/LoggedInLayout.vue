<template>
  <div>
    <Navbar class="overlay"></Navbar>
    <router-view />
  </div>
  <div>
  </div>
</template>

<script>
import Navbar from "../../components/General/NavBar.vue";
export default {
  name: "LoggedIdLayout",
  components: {
    Navbar,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
}
</style>
