<template>
  <div>
    <navbar></navbar>
    <img src="../../assets/images/fundal.png" class="topImage" alt="Top Image">
    <div class="container">
      <div class="containerRow">
        <Clasament :matches="matchesData" class="clasament"></Clasament>
        <ProgramMeciuri class="programMeciuri"></ProgramMeciuri>
      </div>
      <div class="containerNews">
        <NewsBox style="margin-inline: 2.5vw;"
          v-for="(news, index) in newsData"
          :key="index"
          :imageSrc="news.imageSrc"
          :altText="news.altText"
          :date="news.date"
          :title="news.title"
        ></NewsBox>
      </div>
      <div class="containerNews" style="border-bottom: 2px solid grey; padding-bottom: 8vh">
        <NewsBox style="margin-inline: 2.5vw;"
          v-for="(news, index) in additionalNewsData"
          :key="'additional_' + index"
          :imageSrc="news.imageSrc"
          :altText="news.altText"
          :date="news.date"
          :title="news.title"
        ></NewsBox>
      </div>
      <div class="carouselPlayers" >
        <Carousel></Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/General/NavBar.vue';
import Clasament from '@/components/Clasament.vue';
import ProgramMeciuri from '@/components/ProgramMeciuri.vue';
import NewsBox from '@/components/NewsBox.vue';
import Carousel from '@/components/CarouselPlayers.vue';

export default {
  name: 'HomePageView',
  components: {
    Navbar,
    Clasament,
    ProgramMeciuri,
    NewsBox,
    Carousel,
  },
  data() {
    return {
      matchesData: [
        { number: 1, team: 'Atlanta', mp: 8, w: 6, d: 1, l: 1, g: '13:5', pts: 19 },
        { number: 2, team: 'Oc', mp: 9, w: 7, d: 2, l: 2, g: '14:5', pts: 20 },
        { number: 3, team: 'HaHaHa Prod', mp: 10, w: 9, d: 5, l: 2, g: '19:5', pts: 21 },
      ],
      newsData: [
        {
          imageSrc: 'https://source.unsplash.com/random/200x200?sig=3',
          altText: 'news image 1',
          date: '29 nov 23',
          title: 'Exciting News Title 1',
        },
        {
          imageSrc: 'https://source.unsplash.com/random/200x200?sig=5',
          altText: 'news image 2',
          date: '30 nov 23',
          title: 'Exciting News Title 2',
        },
        {
          imageSrc: 'https://source.unsplash.com/random/200x200?sig=6',
          altText: 'news image 3',
          date: '28 nov 23',
          title: 'Exciting News Title 3',
        },
      ],
      additionalNewsData: [
        {
          imageSrc: 'https://source.unsplash.com/random/200x200?sig=6',
          altText: 'additional news image 1',
          date: '1 dec 23',
          title: 'Additional News Title 1',
        },
        {
          imageSrc: 'https://source.unsplash.com/random/200x200?sig=6',
          altText: 'additional news image 2',
          date: '2 dec 23',
          title: 'Additional News Title 2',
        },
        {
          imageSrc: 'https://source.unsplash.com/random/200x200?sig=7',
          altText: 'additional news image 3',
          date: '3 dec 23',
          title: 'Additional News Title 3',
        },
      ],
      topImagePath: 'https://source.unsplash.com/random/200x200?sig=2',
    };
  },
};
</script>

<style>
.topImage {
  width: 100%;
  height: 75%;
  position: absolute;
  z-index: -1;
}

.containerNews {
  width: 80vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10vh;
  padding-left: 1.5vw;
}


.containerRow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 40vh;
}

.container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-top: 10vh;
  height: auto;
}

.clasament {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 2.5vw;
}

.programMeciuri {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-inline: 2.5vw;
}

.carouselPlayers{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 99vw;
  height: 60vh;
  margin-top: 10vh;
  margin-bottom: 10vh;
  background-color: #e1e1e1;
}
</style>
