<template>
<div>
    <Navbar class="overlay"></Navbar>
    <router-view />
  </div>
</template>

<script>
import Navbar from "../../components/General/NavBarUser.vue";
export default {
  name: "NotLoggedLayout",
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
  z-index: 6;
  width: 100%;
}
</style>
