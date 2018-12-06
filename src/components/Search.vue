<template>
  <v-form @submit.prevent="">
    <v-container>
      <v-layout row wrap>

        <v-flex xs12 sm6>
          <v-text-field
            @keyup="search"
            v-model="query"
            label="Search"
            solo
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  let typingTimer;                //timer identifier
  let doneTypingInterval = 1000;  //time in ms, 5 second for example
  export default {
    data() {
      return {
        query: ""
      }
    },
    methods: {
      search() {
        this.$store.commit("setLoading", true)
        clearTimeout(typingTimer);
        typingTimer = setTimeout(() => {
          //console.log("SEARCHING: ", this.query)
          if(this.query !== "")
          {
            this.$store.dispatch("doSearch",this.query)
          }
          else {
            this.$store.commit("setLoading",false)
          }
        }, doneTypingInterval);
        
      }
    }
  }
</script>

<style>

</style>
