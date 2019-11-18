<template>  
<v-app>
      <v-content> 
  <v-card
    class="mx-auto"
    max-width="900"
  >
    <v-card-title>
      <span >Event</span>
    </v-card-title>
    <v-card-subtitle>
       <v-row 
       align="left">
            <v-col >School</v-col>
            <v-col >Event Category</v-col> 
            <v-col >Event Type</v-col> 
        </v-row> 
    </v-card-subtitle>

    <v-card-text >
      <p>event description</p>
      <v-row>
        <v-col >Date</v-col>
            <v-col >Time</v-col> 
            <v-col >Address</v-col> 
                     <GmapMap
      :center="{lat:36.964, lng: -122.015}"
      :zoom="7"
      map-type-id="roadmap"
      style="width: 500px; height: 300px"
      justify ="center"
    >
      <GmapMarker 
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      />
    </GmapMap>
      </v-row> 
      <v-row>
        <v-col >Contact Phone number</v-col>
            <v-col >Contact email</v-col> 
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
   
    data: () => ({
      //
      rating: 3,
      socials: [
        {
          icon: 'fab fa-facebook',
          color: 'indigo',
        },
        {
          icon: 'fab fa-linkedin',
          color: 'cyan darken-1',
        },
        {
          icon: 'fab fa-instagram',
          color: 'red lighten-3',
        },
      ],
    }),
}
</script>

<style scoped>

</style>
