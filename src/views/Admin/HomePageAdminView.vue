<template>
  <div>
    <img src="../../assets/images/fundal.png" class="topImage" alt="Top Image" />
    <div class="container">
      <div class="containerRow">
        <Clasament :matches="matchesData" class="clasament"></Clasament>
        <ProgramMeciuri class="programMeciuri"></ProgramMeciuri>
      </div>
      <div class="containerNews">
        <!-- {{ newsData }} -->
        <NewsBox
          style="margin-inline: 2.5vw"
          v-for="(news, index) in newsData"
          :key="index"
          :imageSrc="news.ImgBase64"
          :altText="news.ShortDescription"
          :date="FormatDate(news.Date)"
          :title="news.Title"
          :id="news.Id"
        ></NewsBox>
      </div>
      <!-- <div class="containerNews" style="border-bottom: 2px solid grey; padding-bottom: 8vh">
        <NewsBox
          style="margin-inline: 2.5vw"
          v-for="(news, index) in additionalNewsData"
          :key="'additional_' + index"
          :imageSrc="news.imageSrc"
          :altText="news.altText"
          :date="news.date"
          :title="news.title"
        ></NewsBox>
      </div> -->
      <div class="carouselPlayers">
        <Carousel></Carousel>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/General/NavBar.vue";
import Clasament from "@/components/Clasament.vue";
import ProgramMeciuri from "@/components/ProgramMeciuri.vue";
import NewsBox from "@/components/NewsBox.vue";
import Carousel from "@/components/CarouselPlayers.vue";

export default {
  name: "HomePageView",
  components: {
    Navbar,
    Clasament,
    ProgramMeciuri,
    NewsBox,
    Carousel,
  },
  data() {
    return {
      matchesData: [],
      newsData: [
        // {
        //   imageSrc: "https://source.unsplash.com/random/200x200?sig=3",
        //   altText: "news image 1",
        //   date: "29 nov 23",
        //   title: "Exciting News Title 1",
        // },
        // {
        //   imageSrc: "https://source.unsplash.com/random/200x200?sig=5",
        //   altText: "news image 2",
        //   date: "30 nov 23",
        //   title: "Exciting News Title 2",
        // },
        // {
        //   imageSrc: "https://source.unsplash.com/random/200x200?sig=6",
        //   altText: "news image 3",
        //   date: "28 nov 23",
        //   title: "Exciting News Title 3",
        // },
      ],

      topImagePath: "https://source.unsplash.com/random/200x200?sig=2",
    };
  },
  methods: {
    FormatDate(inputDateString) {
      const inputDate = new Date(inputDateString);
      const day = inputDate.getDate();
      const month = inputDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const year = inputDate.getFullYear();
      const formattedDay = day.toString().padStart(2, "0");
      const formattedMonth = month.toString().padStart(2, "0");
      const formattedDateString = `${formattedDay}/${formattedMonth}/${year}`;

      return formattedDateString;
    },
    GetTeamRanking() {
      this.$axios.get("/api/TeamRanking/getAll").then((response) => {
        this.matchesData = response.data.Items;
      });
    },
    GetNews() {
      this.$axios
        .get("/api/Article/getAll?pageSize=5")
        .then((response) => {
          this.newsData = response.data.Items;
        })
        .catch(() => {
          this.$swal.fire("Something went wrong", "", "error");
        });
    },
  },
  created() {
    this.GetTeamRanking();
    this.GetNews();
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
  margin-left: 8vw;
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

.carouselPlayers {
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
