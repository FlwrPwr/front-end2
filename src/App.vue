<template>
  <div v-if="$store.state.loader" class="page-loader-background"></div>
  <div v-if="$store.state.loader" class="page-loader-middle"></div>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>
#app {
  font-family: Raleway;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 125%;
  min-height: 100vh;
}
</style>
