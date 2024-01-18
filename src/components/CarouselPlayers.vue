<template>
  <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div v-for="(image, index) in images" :key="index" class="carousel-item" :class="{ active: currentIndex === index }">
        <img :src="image" />
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev" @click="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only"></span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next" @click="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only"></span>
    </a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentIndex: 0,
      images: [
        'https://source.unsplash.com/random/1000x800?sig=1',
        'https://source.unsplash.com/random/1000x800?sig=2',
        'https://source.unsplash.com/random/1000x800?sig=3',
        // add more images here
      ],
    };
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    },
    prev() {
      this.currentIndex = (this.currentIndex + this.images.length - 1) % this.images.length;
    },
  },
  mounted() {
    setInterval(this.next, 3000); // change slide every 3 seconds
  },
};
</script>

<style scoped>
.carousel {
  width: 70%;
  height: 60vh;
  position: relative;
  overflow: hidden;
  margin: auto;
}

.carousel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-control-prev, .carousel-control-next {
  height: 5vh;
  width: 2.5vw;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  z-index: 10;
  padding: 10px;
  cursor: pointer;
}

.carousel-control-prev {
  left: 0;
}

.carousel-control-next {
  right: 0;
}
</style>
