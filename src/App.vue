<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
<style lang="scss">
$bg-color: #f1f6fc;
.v-main {
  background-color: $bg-color;
}
</style>
