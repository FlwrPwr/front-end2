<template>
  <div class="containerSearch">
    <div class="buttonInputWrapper">
      <button class="buttonPress" @click="toggleSlide">
        <font-awesome-icon :icon="['fas', 'magnifying-glass']" style="color: #000000;" />
      </button>
      <input class="inputText" :class="{ 'show': isSliding }" type="text">
    </div>
  </div>
</template>
<script>
export default {
  name: "SlidingSearch",
  data() {
    return {
      isSliding: false,
    };
  },
  methods: {
    toggleSlide() {
      this.isSliding = !this.isSliding;
    },
  },
};
</script>
<style scoped>
.containerSearch {
  display: flex;
  justify-content: center;
}

.buttonInputWrapper {
  position: relative;
  display: inline-flex;
  align-items: center; 
}

.buttonPress {
  background-color: transparent;
  border-radius: 50%; 
  padding-inline: 1rem;
  border: 1px solid black;
  position: relative;
  z-index: 2; 
  margin-left: 1rem;
}

.inputText {
  width: 20rem;
  border: 1px solid black;
  position: absolute;
  right: 100%;
  opacity: 0;
  visibility: hidden;
  transition: transform 0.5s ease, opacity 0.5s ease, visibility 0.5s ease, max-width 0.5s ease;
  transform: translateX(100%);
  max-width: 0;
  overflow: hidden;
}

.show {
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
  max-width: 20rem;
}
</style>
