<template>
    <v-container grid-list-md fluid>
          <v-layout row wrap>
            <v-flex
              v-for="(movie,index) in results"
              v-if="movie.Poster != 'N/A'"
              :key="index"
              xs6
              sm4
              md3
              lg2
            >
              <v-card @click.prevent="goToMovie(movie.imdbID)" tile raised hover>
                <v-img
                  :src="movie.Poster"
                ></v-img>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
</template>

<script>
export default {
    computed: {
        results() {
            return this.$store.state.results
        }
    },
    methods: {
        goToMovie(movieID){
            console.log(movieID)
            this.$router.push(`/movie/${movieID}`)
        }
    }
}
</script>

<style scoped>
    .v-card:hover {
        cursor: pointer;
    }
</style>
