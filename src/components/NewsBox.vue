<template>
  <div class="customBox" @click="NewsDetails()">
    <div class="newsImage">
      <img :src="imageSrc" :alt="altText" />
    </div>
    <div class="newsDate">
      {{ date }}
    </div>
    <div class="newsTitle d-flex jusitfy-content-center">
      <div>{{ title }}</div>
    </div>
  </div>
</template>

<script>
import { relativeTimeThreshold } from "moment";

export default {
  name: "NewsBox",
  props: {
    imageSrc: {
      type: String,
    },
    altText: {
      type: String,
    },
    date: {
      type: String,
    },
    title: {
      type: String,
    },
    id: {
      type: Number,
    },
  },
  methods: {
    NewsDetails() {
      this.$router.push({ name: "NewsDetails", params: { id: this.id } });
    },
  },
};
</script>

<style scoped>
.customBox {
  width: 18vw;
  height: 35vh;
  border-radius: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 2vh;
}

.newsImage {
  width: 15vw;
  height: 17vh;
  border-radius: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: grey;
}

.newsImage img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.newsDate {
  width: 15vw;
  height: 3vh;
  border-radius: 20px;
  display: flex;
  align-items: left;
  color: black;
  font-weight: bold;
  font-size: 1rem;
  margin-top: 1vh;
  margin-left: 5vh;
}

.newsTitle {
  border-radius: 20px;
  align-items: left;
  color: black;
  font-size: 1.5rem;
  margin-top: 2vh;
}
</style>
