<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li :class="{ 'page-item': true, disabled: pageNumber === 1 }">
        <a
          @click="ChangePage(-1)"
          class="page-link test me-2"
          href="#"
          tabindex="-1"
          aria-disabled="true"
          >Previous</a
        >
      </li>
      <li class="page-item" v-for="(item, index) in totalPageCount" :key="index">
        <div v-if="item <= 2">
          <a
            @click="SelectPage(item)"
            :class="{ selected: item === pageNumber }"
            class="page-link border test rounded me-2"
            href="#"
            >{{ item }}</a
          >
        </div>
        <div v-else>
          <div v-if="item - 1 === pageNumber || item === pageNumber || item + 1 === pageNumber">
            <a
              :class="{ selected: item === pageNumber }"
              @click="SelectPage(item)"
              class="page-link border rounded test me-2"
              href="#"
              >{{ item }}</a
            >
          </div>
          <div v-else>
            <div v-if="item - 2 <= totalPageCount">
              <div v-if="item > totalPageCount - 2">
                <a
                  :class="{ selected: item === pageNumber }"
                  @click="SelectPage(item)"
                  class="page-link border rounde test me-2"
                  href="#"
                  >{{ item }}</a
                >
              </div>
              <div v-else>
                <div v-if="item - 2 === pageNumber || item + 2 === pageNumber">
                  <div class="row ms-1 me-1">
                    <a class="col-auto page-link border rounded test me-2 test" href="#">.</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
      <li :class="{ 'page-item': true, disabled: pageNumber === totalPageCount }">
        <a @click="ChangePage(1)" class="page-link test me-2" href="#">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    totalItemCount: {},
    totalPageCount: {},
    pageSize: {},
    pageNumber: {},
  },
  name: "Pagination",
  methods: {
    SelectPage(nr) {
      this.$emit("select-page", nr);
    },
    ChangePage(nr) {
      this.$emit("select-page", this.pageNumber + nr);
    },
  },
};
</script>

<style scoped>
.test {
  text-decoration: none;
  color: black;
}

.selected {
  background-color: lightgray;
}
</style>
