<template>
  <v-form>
    <v-container>
      <v-layout row wrap>

        <v-flex xs12 sm6>
          <v-text-field
            @blur="search"
            v-model="query"
            label="Search"
            solo
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
</template>

<script>
  export default {
    data() {
      return {
        query: ""
      }
    },
    methods: {
      search() {
        console.log("SEARCHING: ", this.query)
      }
    }
  }
</script>

<style>

</style>
