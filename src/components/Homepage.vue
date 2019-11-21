<template>
  <v-app>
    <v-app-bar
          app
          fluid
          color="blue darken-3"
          dark>
    
          <v-toolbar-title>Homepage</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn text  :to="{name: 'register'}">Register</v-btn>
          <v-btn text  :to="{name: 'login'}">Login</v-btn>
          <v-btn text  v-on:click="handleLogout">Logout</v-btn>
          </v-app-bar>
    <v-container fluid> 
      <v-container>
        <p class="display-4 font-weight-thin">Welcome to CampusEvents</p>
        <v-icon large>school</v-icon>
      </v-container>
      <v-divider></v-divider>
      <v-container>
        <v-btn color="secondary" :to="{name: 'dashboard'}">To Dashboard</v-btn>
        <v-btn color="secondary" :to="{name: 'admin'}">To Admin Dashboard</v-btn>
        <v-btn color="secondary" :to="{name: 'superadmin'}">To Super-Admin Dashboard</v-btn>
      </v-container>
      <v-row align="center" justify="space-around">
          <v-img
            src="https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="400"
            max-height="250"
          ></v-img>  
          <v-img
            src="https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?ixlib=rb-1.2.1&auto=format&fit=crop&w=1085&q=80"
            aspect-ratio="1"
            class="grey lighten-2"
            max-width="400"
            max-height="250"
          ></v-img>  
      </v-row> 
     </v-container>
  </v-app>
</template>

<script>
import Notifications from 'vue-notification'

export default {
  data(){
    return {
      msg: 'Create events for your campus'
    }
  },
  methods: {
    handleLogout(e) {
      if (localStorage.getItem('jwt') != null) {
        localStorage.removeItem('jwt')
        localStorage.removeItem('user')
        this.$emit('loggedOut')
        this.$notify({
          group: 'alerts',
          title: 'Logged Out',
          text: 'Successfully Logged Out.',
          closeOnClick: true
        })
      }
      else {
        this.$notify({
          group: 'alerts',
          title: 'Failed Logout',
          text: 'No account to logout.',
          closeOnClick: true
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
