<template>
  <v-app>
    <v-toolbar app>
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline text-uppercase">
        <span>OMDB</span>
        <span class="font-weight-light"> - API SEARCH</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      //
    }
  }
}
</script>
