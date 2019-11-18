<template>   
  <v-card
    class="mx-auto"
    max-width="1000"
  >
    <v-card-title>
      <span class="title font-weight-light">Event</span>
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
    <v-card-actions>
       
    </v-card-actions>
  </v-card>

</template>

<script>
export default {
   
    data: () => ({
      //
      rating: 3
    }),
}
</script>

<style scoped>

</style>
