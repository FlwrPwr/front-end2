<template>
  <div class="mainComponent">
    <div class="row m-0 ms-5 w-100">
      <div class="titleNews">{{ header }}</div>
      <div class="subtitleNews">{{ subhead }}</div>
    </div>
    <img class="imageNews" :src="$utils.GetImageFormat(imgBase64)">
    <div class="dateInfo">
      {{ daysAgo(date) }} days ago
    </div>
    <div class="newsText">
      <div class="adminButtons">
        <font-awesome-icon :icon="['far', 'pen-to-square']" class="adminEdit"  @click="$emit('edit', id)"/>
        <font-awesome-icon :icon="['fas', 'trash-can']" class="adminDelete" @click="$emit('delete', id)" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NewsItem',
  emits:['get', 'edit', 'delete'],
  props: {
    id: Number,
    header: String,
    subhead: String,
    imgBase64: String,
    date: String,
    titleNews: String,
    subtitleNews: String,
    newsText: String,
  },
  methods: {
    daysAgo(date) {
      const past = new Date(date);
      const now = new Date();
      const difference = now - past;
      const daysAgo = Math.floor(difference / (1000 * 60 * 60 * 24));
      return daysAgo;
    },

  },
};
</script>

<style scoped>
.mainComponent {
  display: flex;
  flex-direction: column;
  height: 24rem;
  width: 18rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.5);
}

.imageUser {
  height: 2.5rem;
  width: auto;
  border-radius: 100rem;
  background-color: black;
  margin: 1vh;
}

.infoNews {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0.2rem;
}

.titleNews {
  color: black;
  font-size: 1.5rem;
}

.subtitleNews {
  color: grey;
  font-size: 0.8rem;
}

.imageNews {
  height: 10rem;
  margin-top: 1rem;
  vertical-align: middle;
}

.imageNews img {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 6rem;
}

.dateInfo {
  color: blue;
  text-align: right;
  padding-inline: 0.5vh;
  text-decoration: bold;
  font-weight: bold;
  font-size: 1rem;
}

.newsText {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-inline: 0.5rem;
}

.newsContent {
  height: 7rem;
  width: 15rem;
  padding: 0.2rem;
  display: -webkit-box;

  max-height: 3.2rem;
  line-height: 1rem;
}

.adminButtons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin: 0.5rem;
}

.adminEdit {
  height: 1.3rem;
  width: auto;
  margin: 0.2rem;
  padding: 0.3rem;
  margin: 0.1;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);
  color: rgb(126, 117, 117);
}

.adminEdit:hover {
  color: blue;
}

.adminDelete {
  height: 1.3rem;
  width: auto;
  margin: 0.2rem;
  padding: 0.3rem;
  margin: 0.1;
  box-shadow: 5px 5px 5px 0px rgba(0, 0, 0, 0.2);
  margin-right: 1rem;
  color: rgb(126, 117, 117);
}

.adminDelete:hover {
  color: red;
}

.modal {
  display: none;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1050;
  outline: 0;
  transition: opacity 0.15s;
}

.modal.show {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  position: relative;
  max-width: 80%;
  margin: 0 auto;
}

.modal-content {
  position: relative;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  outline: 0;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
}

.modal-header {
  padding: 15px;
  border-bottom: 1px solid #e9ecef;
}

.modal-titleNews {
  margin: 0;
  line-height: 1.5;
}

.modal-body {
  position: relative;
  padding: 15px;
}

.modal-footer {
  display: flex;
  justify-content: flex-start;
  padding: 15px;
  border-top: 1px solid #e9ecef;
}

.btn-secondary {
  color: #fff;
  background-color: limegreen;
  border-color: limegreen;
}

.btn-secondary:hover {
  color: #fff;
  background-color: #228B22;
  border-color: #228B22;
}

.btn-danger {
  color: #fff;
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  color: #fff;
  background-color: #c82333;
  border-color: #bd2130;
}
</style>
