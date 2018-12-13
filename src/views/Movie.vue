<template>
    <div id="movie">
        <v-container grid-list-md>
                    
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card>
                        <v-card-title class="display-1"> {{movie.Title}} </v-card-title>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-card>
                        <v-img
                        :src="movie.Poster"
                        ></v-img>
                        <v-card-title primary-title>
                        <div>
                            <div>Rated: {{movie.Rated}}</div>
                            <div>Released: {{movie.Released}}</div>
                            <div>Runtime: {{movie.Runtime}}</div>
                        </div>
                        </v-card-title>
                    </v-card>
                </v-flex>
                <v-flex xs12 sm6>
                    <v-card>
                        <v-card-title >
                            <div class="headline">Description</div>
                            <div>{{movie.Plot}}</div>                        
                        </v-card-title>
                    </v-card>
                     <v-card>
                        <v-card-title >
                                              
                        </v-card-title>
                    </v-card>
                </v-flex>
                <v-flex xs12>
                    <v-card class="mb-2" v-for="(review,index) in movie.reviews" :key="index">
                        <v-card-title>
                            <v-icon v-for="i in review.stars" :key="i">stars</v-icon> {{review.review}}
                        </v-card-title>
                    </v-card>
                </v-flex>
                
                <v-flex xs12>
                    <v-form v-if="user" ref="form" @submit.prevent="submit" v-model="valid" lazy-validation>
                        <v-text-field
                            v-model="Review"
                            :rules = "reviewRules"
                            label="Review"
                            required
                        ></v-text-field>
                        <v-select
                            v-model="select"
                            :items="items"
                            :rules="[v => !!v || 'You must select a rating out of 5 stars']"
                            label="Star Rating"
                            required
                        ></v-select>

                        <v-btn type="submit" :disabled="!valid">
                            Submit
                        </v-btn>
                        <v-btn @click="clear">clear</v-btn>
                    </v-form>
                    <v-card v-else>
                        <p class="text-xs-center headline">Please Log In To Leave Reviews</p>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            valid: true,
            Review: '',
            reviewRules: [
                v => !!v || 'Review is required to submit',
                v => (v && v.length <= 10000) || 'Review must be less than 10000 characters long'
            ],
            select: null,
            items: [
                '1 Star',
                '2 Stars',
                '3 Stars',
                '4 Stars',
                '5 Stars'
            ],                                    
        }
    },
    
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
            this.$store.dispatch("postReview", {
                reviewText: this.Review,
                stars: this.stars,
                movieId: this.movieID     
            })
            this.$refs.form.reset()
        }

      },
      clear () {
        this.$refs.form.reset()
      }
    },
    computed: {
        movieID() {
            return this.$route.params.id
        },
        movie() {
            return this.$store.state.movieData
        },
        stars() {
            return +this.select[0]
        },
        user() {
            return this.$store.state.user
        }
    },
    mounted() {
        this.$store.dispatch("fetchMovie",this.movieID);
        this.$store.commit("setPage",'movie')
    }
}

</script>

<style>

</style>
