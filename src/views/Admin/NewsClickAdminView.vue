<template>
  <div class="newsPage">
    <div class="newsFrontPage">
      <div class="newsTitle">
        <div class="newsInfo">
          <div class="newsTitleText">{{ article.Title }}</div>
          <div class="newsdate">{{ FormatDate(article.Date) }}</div>
        </div>
        <div class="newsButtons">
          <div class="prevButton" v-for="(tag, index) in article.Tags" :key="index">#{{ tag }}</div>
        </div>
      </div>
      <div class="frontImage">
        <img :src="article.ImgBase64" alt="Football Match" />
      </div>
    </div>
    <div class="newsDescription">
      <div>
        <div class="bar"></div>
      </div>
      {{ article.Descriptiom }}
      <br /><br />
      <div v-html="article.Content"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // This is to accept the id as a prop
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      date: "12 Dec 23",
      title: "BE THERE TO BACK THE TEAM AGAINST ST JOHNSTONE ON WEDNESDAY!",
      prevArticle: "Prev article",
      nextArticle: "Next article",
      imageSrc: "https://source.unsplash.com/random/1200x700?sig=2",
      description:
        "RANGERS are in Scottish Premiership action at Ibrox on Wednesday night against St Johnstone and you can be there to roar on the team under the lights. The Gers will be looking to secure another three points after Saturday’s 3-1 win over Dundee at Ibrox and continue the run of three back-to-back wins on League duty.                           League duty.RANGERS are in Scottish Premiership action at Ibrox on Wednesday night against St Johnstone and you can be there to roar on the team under the lights. The Gers will be looking to secure another three points after Saturday’s 3-1 win over Dundee at Ibrox and continue the run of three back-to-back wins on League duty.                           League duty.",
      additionalImages: [
        { src: "https://source.unsplash.com/random/200x200?sig=6", alt: "Additional Image 1" },
        { src: "https://source.unsplash.com/random/200x200?sig=7", alt: "Additional Image 2" },
        { src: "https://source.unsplash.com/random/200x200?sig=8", alt: "Additional Image 3" },
      ],
      article: {},
    };
  },
  methods: {
    loadPrevArticle() {
      console.log("Loading previous article");
    },

    loadNextArticle() {
      console.log("Loading next article");
    },
    GetArticle() {
      this.$axios.get(`/api/Article/get/${this.id}`).then((response) => {
        this.article = response.data;
      });
    },
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
  },
  created() {
    this.GetArticle();
  },
};
</script>

<style scoped>
.newsPage {
  display: flex;
  height: auto;
  margin-top: 20vh;
  flex-direction: column;
}

.newsInfo {
  display: flex;
  height: 55vh;
  width: 60vw;
  justify-content: center;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  padding-left: 8vw;
}

.newsTitle {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.newsDescription {
  display: flex;
  height: auto;
  flex-direction: row;
  text-align: left;
  margin-left: 5vw;
  margin-right: 5vw;
  margin-top: 5vh;
  margin-bottom: 5vh;
  padding-right: 15vw;
  padding-left: 10vw;
}

.additionalImages {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.newsFrontPage {
  display: flex;
  flex-direction: row;
  height: 60vh;
}

.newsButtons {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 65vw;
  height: 5vh;
  border-bottom: 1px solid grey;
}

.frontImage {
  display: flex;
  width: 100%;
  max-height: 60vh;
  justify-content: center;
  overflow: hidden;
  margin-right: 3vw;
}

.frontImage img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.bar {
  width: 10px;
  height: 50px;
  background-color: blue;
  border-radius: 25px;
  margin-right: 2vw;
  margin-top: 1vh;
}

.collage {
  display: flex;
  justify-content: center;
  width: 40%;
  height: 40%;
}

.left {
  display: flex;
  flex-direction: column;
  margin-right: 10px;
  width: 15vw;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.right {
  flex-grow: 2;
}
</style>
