<template>  
<v-app>
      <v-content> 
  <v-card
    class="mx-auto"
    max-width="900"
  >
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
          :center="{lat:36.964, lng: -122.015}"
          :zoom="7"
          map-type-id="roadmap"
          style="width: 500px; height: 300px"
          justify ="center"
        >
          <GmapMarker 
            :position="{lat:36.964, lng: -122.015}"
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
  </v-card>
  </v-content>
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
          rso: "Tech Club",
          category: "Tech",
          type: "Public",
          description: " we gonna party ",
          date: "11-19",
          time: "11:30",
          address: "4000 Central Florida Blvd, Orlando, FL 32816", 
          phone: "407 456-9504",
          email: "email"
        },

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
}
</script>

<style scoped>

</style>
