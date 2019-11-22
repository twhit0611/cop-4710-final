<template>  
<v-app>
   <v-app-bar
          app
          color="blue darken-3"
          dark>
          <v-btn icon class="hidden-xs-only" :to="{name: 'dashboard'}">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
        <v-toolbar-title>Event Page</v-toolbar-title>
          </v-app-bar>
 <v-container fluid>
  <v-card
    class="mx-auto"
    max-width="900">
    <v-card-title>
      <span >{{event.name}}</span>
    </v-card-title>
    <v-card-subtitle>
       <v-row 
       align="left">
            <v-col>{{event.school}}</v-col>
            <v-col>{{event.rso}}</v-col>
            <v-col>{{event.category}}</v-col> 
            <v-col>{{event.type}}</v-col> 
            
        </v-row> 
    </v-card-subtitle>

    <v-card-text >
      <v-divider></v-divider>
      <v-col>{{event.description}}</v-col>
      <v-divider></v-divider>
      <v-row>
        <v-col >{{event.date}}</v-col>
        <v-col >{{event.time}}</v-col> 
        <v-col >{{event.address}}</v-col> 
      </v-row> 
      <v-divider></v-divider>
      <v-row justify="center">
        <GmapMap
          :center="{lat:28.606916, lng: -81.202644}"
          :zoom="15"
          map-type-id="roadmap"
          style="width: 500px; height: 300px"
          justify ="center"
        >
          <GmapMarker 
            :position="{lat:28.606916, lng: -81.202644}"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          />
        </GmapMap>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col >{{event.phone}}</v-col>
        <v-col >{{event.email}}</v-col> 
      </v-row>  
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="pa-4">
      <v-btn
        v-for="(social, icon) in socials"
        :key="icon"
        :color="social.color"
        fab
        icon
        small 
      > 
        <v-icon>{{ social.icon }}</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <span>
        ({{ rating }})
      </span>
      <v-rating
        v-model="rating"
        background-color="white"
        color="yellow accent-4"
        hover
        size="18"
        
      ></v-rating>
    </v-card-actions>
    <v-card-text>

      <v-card>
        <v-card-title>Event Comments</v-card-title>
        <v-container >

          <v-row v-for="comment in comments" v-bind:key="comment" >
          <v-chip class="ma-2">
            {{comment}}
          </v-chip>
          </v-row>
              <v-text-field
                v-model="message"
                outlined
                clearable
                label="Message"
                type="text"> 
                <template v-slot:append-outer>
                  <v-btn flat color="primary" @click="clickMe">Send</v-btn>
                </template>
              </v-text-field>
        </v-container>
      </v-card>


    </v-card-text>
  </v-card>
  </v-container>
</v-app>
</template>

<script>

export default {
    data(){
      return {
        // event data
        event: {
          name: 'BBQ',
          school: "UCF",
          rso: "Spanish Club",
          category: "Social",
          type: "Public",
          description: "BBQ at the lake, bring your swim suits!",
          date: "2019-11-24",
          time: "11:30am",
          address: "12491 Gemini Blvd N, Orlando, FL 32816, USA", 
          phone: "(407) 409-3832",
          email: "spanishclub@ucf.edu"
        },

        // v-model for comments
        message: '',
        comments: [],

        rating: 3,
        socials: [
          {
            icon: 'fab fa-facebook',
            color: 'indigo',
          },
                  {
            icon: 'fab fa-twitter',
            color: 'cyan',
          },
          {
            icon: 'fab fa-instagram',
            color: 'red lighten-3',
          },
        ],
      }
    },

    methods: {
      clickMe() {
        this.comments.push(this.message)
        this.message = ''
      }
    }
}
</script>

<style scoped>

</style>
