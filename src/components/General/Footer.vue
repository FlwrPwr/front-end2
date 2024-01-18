<template>
  <footer class="footer1 ">
    <div class="container1">
      <div class="sponsors-container">
        <img src="../../assets/images/sponsors/pepsi.png" alt="../../../assets/images/unknown.png">
        <img src="../../assets/images/sponsors/superbet.png" alt="../../../assets/images/unknown.png">
        <img src="../../assets/images/sponsors/mandachi.png" alt="../../../assets/images/unknown.png">
      </div>
      <p class="text-center1">
        © 2024 FlowerPower Team. All rights reserved.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style scoped>
.footer1 {
  margin-top: 20%;
  background-color: grey;
  padding: 1rem;
  text-align: center;
}

.sponsors-container img {
  height: 3rem;
  filter: grayscale(100%) contrast(200%) brightness(50%);

}

</style>
