<template>
  <v-app>
    <v-toolbar>
      <v-spacer></v-spacer>
      <v-toolbar-title to="/" class="headline text-uppercase">
        <span>OMDB</span>
        <span class="font-weight-light"> - MOVIE SEARCH</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="!user" @click.prevent="dialog=true" color="primary" dark>Login</v-btn>
      <v-btn v-else @click.prevent="logout" color="primary" dark>Logout</v-btn>
    </v-toolbar>
    <v-progress-linear class="mt-0 z-14" :indeterminate="loading"></v-progress-linear>
    <v-content>
      <router-view />
    </v-content>
    <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      
      <v-card v-if="form=='login'">
        <v-card-title>
          <span class="headline">Login to leave reviews!</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field ref="uname" v-model="username" label="Username*" required></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field ref="upass" v-model="password" label="Password*" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <span class="ml-3">Don't have an account?</span>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="form = 'register'">Register Instead</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="login">Login</v-btn>
        </v-card-actions>
      </v-card>
      <v-card v-if="form=='register'">
        <v-card-title>
          <span class="headline">Register for an account!</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12>
                <v-text-field v-model="username" label="Create a Username*" required></v-text-field>
              </v-flex>             
              <v-flex xs12>
                <v-text-field v-model="password" label="Create a Password*" type="password" required></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <span class="ml-3">Already have an account?</span>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="form = 'login'">Login Instead</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="register">Register</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      dialog: false,
      form: "login",
      username: "",
      password: ""
    }
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    login() {
      this.$store.dispatch("userLogin", {
        uname: this.username,
        upass: this.password
      })
      this.dialog = false;
    },
    logout() {
      this.$store.dispatch("userLogout")
    },
    register() {
      this.$store.dispatch("userRegister", {
        uname: this.username,
        upass: this.password
      })        
    }
  }
}
</script>
