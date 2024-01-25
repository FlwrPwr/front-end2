
<template>
  <div class="topBar">
    <div class="leftItems">
      <div><img src="../../assets/images/Sample_User_Icon.png" class="image-topBar"></div>
      <div>
        <h5>News</h5>
      </div>
    </div>
    <SlidingSearch></SlidingSearch>
  </div>
  <div class="newsItem">
    <div class="newsItems">
      <NewsItem v-for="(item, index) in articles.Items" :key="index" :id="item.Id" :header="item.Title"
        :subhead="item.ShortDescription" :imgBase64="item.ImgBase64" :date="item.Date" :title="item.title"
        :subtitle="item.subtitle" :newsText="item.Content" @get="GetNews" @edit="OpenEditNewsModal" @delete="DeleteNews">
      </NewsItem>
     
    </div>
  </div>
  
  <EditNews ref="editNewsModalRef" @get="GetNews" :article="editNews" :addedTags="addedTags"></EditNews>

</template>

<script default>
import SlidingSearch from '../../components/General/SearchComponent.vue';
import NewsItem from '../../components/News/newsItemUser.vue';
export default {
  components: {
    NewsItem,
    SlidingSearch,
  },
  name: 'TableComponent',
  data() {
    return {
      isDarker: false,
      newsItemsData: [],
      newsItems: [],
      transferItems: [],
      articles: [],
      filter: {
        PageSize: 20,
        PageNumber: 1,
      },
      editNews: {},
      key: 1,
      addedTags: [],
    };
  },
  methods: {
    DeleteNews(id) {
      this.$swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.$axios.put(`/api/Article/deleteVirtual/${id}`).then(() => {
            this.$swal.fire('Article deteleted succesfully', '', 'success');
            this.$emit('get');
          })
        }
      });
    },

    OpenAddNewsModal() {
      this.$refs.addNewsModalRef.ClearModal();
      this.isDarker = true;
      setTimeout(() => {
        this.isDarker = false;
      }, 400);
      $('#addNewsModal').modal('show');
    },
    OpenEditNewsModal(id) {
      this.$axios.get(`/api/Article/get/${id}`).then((response) => {
        this.editNews = response.data;
        if (this.editNews.Tags) { this.addedTags = this.editNews.Tags.split(','); }
        $('#editNewsModal').modal('show');
      }).catch(() => {
        this.$swal.fire('This news does not exist', '', 'error');
      })
    },
    GetNews() {
      this.$axios.get('/api/Article/getAll').then((response) => {
        this.articles = response.data;
      }).catch(() => {
        this.$swal.fire('Something went wrong', '', 'error');
      })
    }
  },
  created() {
    this.GetNews();
  },

}

</script>

<style scoped>
.topBar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1vh;
  border-bottom: 1px solid black;
  margin-top: 3rem;
  padding-top: 5%;
}

.leftItems {
  display: flex;
  align-items: center;
}

.leftItems>div {
  display: inline-flex;
  align-items: center;
  margin-right: 1vh;

}

.image-topBar {
  height: 5vh;
  width: auto;
  border-radius: 10vh;
  padding: 0.5vh;
  margin: 1vh;
}

.newsItems {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;
}

.newsItem {
  margin-block: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mainComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 18rem;
  height: auto;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
  transition: background-color 0.3s ease;
  color: #000000;
  transition: color 0.3s ease;
}

.isDarker {
  background-color: #d3d3d3;
}

.AddImage {
  width: 15rem;
  height: auto;
  text-align: center;
  font-size: 5rem;
}


.AddText {
  font-size: 2rem;
}

.mainComponent:hover .icon-hover {
  color: limegreen;
}

.mainComponent:hover .AddText {
  color: limegreen;
}
</style>