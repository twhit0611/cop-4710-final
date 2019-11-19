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

  <!-- <div class="main">
    <notifications group="alerts" />
    <div class="routing">
      <ul>
        <li><a href="register">Register</a><li>
        <li><a href="login">Login</a></li>
        <li><a href="dashboard">Access Dashboard</a></li>
        <li><a href="admin">Access Admin Dashboard</a></li>
        <li><a href="superadmin">Access Super-Admin Dashboard</a></li>
        <li><a v-on:click="handleLogout">Logout</a></li>
      </ul>
    </div>
    <br>
    <h1>Welcome to CampusEvents</h1>
    <h2>{{msg}}</h2>
    <br>
    <h3>Features</h3>
    <br> 
    <br>
    <div class="features">
      <ol>
        <li>Create new events</li>
        <li>Search events by location</li>
        <li>Search events by RSO</li>
        <li>Search events by campus</li>
        <li>Register new RSO's</li>
        <li>Universities may register their campus</li>
      </ol>
    </div>
  </div> -->
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

<style>
  /* h1 {
    font-weight: normal;
    background: black;
    max-width: 400px;
    width: auto;
    margin: auto;
    color:white;
  }

  h2 {
    font-weight: normal;
    background: black;
    max-width: 400px;
    width: auto;
    margin: auto;
    border-bottom: 5px solid #e0c600;
    color:white;
  }

  h3 {
    font-size: 140%;
    font-weight: normal;
    border-bottom: 3px solid #e0c600;
    background: black;
    position: absolute;
    max-width: 400px;
    width: auto;
    color:white;
  }

  ul {
    list-style-type: none;
    overflow: hidden;
    background-color: black;
    border-bottom: 5px solid #e0c600;
    position: fixed;
    left:0px;
    top:0;
    width:100%;
    margin: auto;
  }
  

  ol {
    list-style-type: none;
    text-align: left;
    padding: 10px 20px;
    border-left: 5px solid #e0c600;
    background-color: black;
    width: auto;
    max-width: 300px;
  }

  li {
    color:white;
  }

  li a {
    display: block;
    text-align: center;
    padding: 16px;
    text-decoration: none;
    float: left;
    color:white;
  }

  li a:hover {
    background-color: #e0c600;
    color: white;
    cursor: pointer;
  }

  body {
    background-image: url("https://knightnews.com/wp-content/uploads/2017/10/14712758_10157511833500527_1554147307089290995_o-1.jpg");
  } */

</style>
