<template>
  <div class="hotels container">
    <div class="header">
      <h1>Hotels list</h1>
      <input type="text" id="search" class="header-input" v-model="search" />
    </div>
    <div class="main">
      <ul v-if="results && results.length" class="list">
        <li
          class="list-item"
          v-for="(post, index) of filteredList"
          :key="index"
        >
          <div class="hotel">
            <div class="hotel-picture">
              <img :src="post.result_object.photo.images.small.url" alt />
            </div>
            <div
              class="hotel-name"
              @click="goTodetail(post.result_object.name)"
            >
              <h2 v-html="post.nameItem"></h2>
              <h3>
                <span>raiting:</span>
                {{ post.result_object.rating }}
              </h3>
            </div>
            <a @click="onClick(post)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon
                  points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
                />
              </svg>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import AboutView from "../views/AboutView.vue";
import Vuetify from "vuetify";
export default {
  components: {
    AboutView,
  },
  name: "HelloWorld",
  data() {
    return {
      results: [],
      search: "",
      nameItem: "",
    };
  },

  created() {
    const options = {
      method: "GET",
      url: "https://travel-advisor.p.rapidapi.com/locations/search",
      params: {
        query: "all",
        limit: "50",
        offset: "0",
        units: "km",
        location_id: "1",
        currency: "USD",
        sort: "relevance",
        lang: "en_US",
      },
      headers: {
        "X-RapidAPI-Key": "5bc948cc40mshc41ebc048568403p14fc8ajsnd0bc8fc972e6",
        "X-RapidAPI-Host": "travel-advisor.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then((response) => {
        this.results = response.data.data.map((post) => ({
          ...post,
          nameItem: post.result_object.name,
        }));
        console.log(this.nameItem);
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  computed: {
    filteredList() {
      return this.results.filter((post) => {
        return post.nameItem.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    onClick(post) {
      console.log(post.nameItem);
      if (!this.cart) return;
    },
    goTodetail(id) {
      this.$router.push({ name: "about", params: { Pid: id } });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$border-color: #e1e1e1;
$white: #ffffff;
$margin-bt: 15px;
$flex: flex;
h3 {
  margin: 40px 0 0;
}
.list {
  height: 48rem;
  overflow: auto;
  list-style-type: none;
  padding: 0;
  display: $flex;
  justify-content: center;
  flex-flow: wrap;
  margin: 0 auto;
  &-item {
    display: $flex;
    margin: 15px;
    width: 400px;
    background-color: #ffffff;
    border: 1px solid $border-color;
    border-radius: 24px;
  }
}
.hotel {
  width: 100%;
  display: $flex;
  padding: 20px 20px 20px 0px;
  &-name {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  &-picture {
    height: 100%;
    & img {
      height: 100px;
      margin: 30px 15px 30px 30px;
      border-radius: 24px;
    }
  }
}
.container {
  width: 80%;
  margin: 0 auto;
}
.header {
  width: 100%;
  margin: 40px 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  &-input {
    width: 40%;
    height: 25px;
    border-radius: 24px;
    border: 1px solid black;
    padding: 0 15px;
  }
}
</style>
