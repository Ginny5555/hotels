<template>
  <div class="details container">
    <div class="information">
      <div class="header">
        <h1>See more details</h1>
      </div>
      <div class="info" v-for="(post, index) of results" :key="index">
        <div class="place" v-if="id == post.result_object.name">
          <div class="place-pic">
            <img :src="post.result_object.photo.images.medium.url" alt />
            <div class="place-pic__name">
              <hr />
              <h2>{{ post.result_object.name }}</h2>
              <h3>raiting: {{ post.result_object.rating }}</h3>
              <hr />
            </div>
          </div>
          <hr />
          <div class="place-details">
            <p>Type: {{ post.result_object.category.name }}</p>
            <p>Address: {{ post.result_object.address }}</p>
            <p>Timezone: {{ post.result_object.timezone }}</p>
            <hr />
          </div>
          <div class="place-review">
            <div class="place-review__rev">
              <div class="place-review__rev-block">
                <p>{{ post.review_snippet.snippet }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="review">
        <div class="review-comments">
          <ul class="comment">
            <li class="comment-added" v-for="item in list">
              {{ item }}
            </li>
          </ul>
          <div class="review-comments__text text">
            <input
              class="text-area"
              type="text"
              v-model="input"
              @keyup.enter="addItem"
              placeholder="your comment"
            />
            <button @click="addItem" class="button">Add comment</button>
          </div>
        </div>
        <router-link to="/">
          <button class="button">back</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "about",
  data() {
    return {
      results: [],
      id: this.$route.params.Pid,
      title: "about",
      input: "",
      list: [],
    };
  },
  methods: {
    goTodetail(id) {
      this.$router.push({ name: "about", params: { Pid: id } });
    },
    addItem() {
      this.list.push(this.input);
      this.input = "";
    },
  },
  created() {
    const options = {
      method: "GET",
      url: "https://travel-advisor.p.rapidapi.com/locations/search",
      params: {
        query: "all",
        limit: "30",
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

    axios.request(options).then((response) => {
      this.results = response.data.data.map((post) => ({
        ...post,
      }));
      console.log(this.results);
    });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
$bg-color: #f1f6fc;
$border-color: #e1e1e1;
$white: #ffffff;
$margin-bt: 15px;
$comment-bg: rgb(233 245 252);
$comment-bord: rgb(218 222 223);
h3 {
  margin: 40px 0 0;
}
hr {
  border: 1px solid $border-color;
  margin: 40px 0;
}
.text-area {
  width: 100%;
  height: 100px;
  margin-bottom: $margin-bt;
  border: 1px solid black;
  padding: 15px;
}
.button {
  width: 200px;
  padding: 10px;
  border-radius: 20px;
  margin-bottom: $margin-bt;
  background-color: $bg-color;
  border: 1px solid $border-color;
  box-shadow: 0px 3px 10px -7px;
}
.information {
  border: 1px solid $border-color;
  border-radius: 24px;
  background-color: $white;
  padding: 0 50px 50px;
  margin-top: 40px;
}
.review {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  flex-flow: wrap;
  &-comments {
    width: 280px;
    &__text {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
.comment {
  padding-left: 0;
  width: 100%;
  &-added {
    width: 80%;
    list-style-type: none;
    position: relative;
    margin: 15px 0;
    padding: 15px;
    min-height: 10px;
    font-family: sans-serif;
    background: $comment-bg;
    border: 2px solid $comment-bord;
    border-radius: 20px;
  }
  &-added:before {
    content: "";
    position: absolute;
    top: -20px;
    left: 15px;
    border: 10px solid #fdfcfc;
    border-bottom: 10px solid $comment-bg;
    border-left: 10px solid $comment-bg;
    z-index: -1;
  }
  &-added:after {
    content: "";
    position: absolute;
    top: -15px;
    left: 17px;
    border: 10px solid hsla(0, 0%, 0%, 0);
    border-bottom: 10px solid $comment-bg;
    border-left: 10px solid $comment-bg;
    z-index: 1;
  }
}
.place {
  & img {
    width: 24rem;
    border-radius: 24px;
  }
  @media (max-width: 508px) {
    & img {
      width: 80%;
    }
  }
  &-review {
    width: 350px;
    &__rev {
      width: 80%;
      &-block {
        width: 100%;
        position: relative;
        margin: 15px 0;
        min-height: 10px;
        font-family: sans-serif;
        background: $comment-bg;
        border: 2px solid $comment-bord;
        border-radius: 20px;
        padding: 15px;
      }
      &-block:before {
        content: "";
        position: absolute;
        top: -20px;
        left: 15px;
        border: 10px solid #fdfcfc;
        border-bottom: 10px solid $comment-bg;
        border-left: 10px solid $comment-bg;
        z-index: -1;
      }
      &-block:after {
        content: "";
        position: absolute;
        top: -15px;
        left: 17px;
        border: 10px solid hsla(0, 0%, 0%, 0);
        border-bottom: 10px solid $comment-bg;
        border-left: 10px solid $comment-bg;
        z-index: 1;
      }
    }
  }
  &-pic {
    width: 100%;
    display: flex;
    display: inline-flex;
    flex-flow: wrap-reverse;
    justify-content: space-between;
    align-items: center;
    &__name {
      display: flex;
      flex-flow: column;
      justify-content: space-around;
    }
  }
  &-details {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
