<template>
  <div>
    <Navbar class="overlay"></Navbar>
    <router-view />
  </div>
  <div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "../../components/General/NavBar.vue";
import Footer from "../../components/General/Footer.vue";
export default {
  name: "LoggedIdLayout",
  components: {
    Footer,
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
