<template>
  <v-app>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-toolbar-title class="headline text-uppercase">
        <span>OMDB</span>
        <span class="font-weight-light"> - API SEARCH</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-progress-linear class="mt-0 z-14" :indeterminate="loading"></v-progress-linear>
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
  },
  computed: {
    loading() {
      return this.$store.state.loading
    }
  }
}
</script>
