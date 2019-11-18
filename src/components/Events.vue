<template>   
  <div >
    <p class="font-weight-black">Event Name</p>
    <p class="font-weight-black">School Name</p>
    <p class="font-weight-regular">Description.</p>
    <p class="font-weight-regular">Time</p>
    <p class="font-weight-regular">Location</p>
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
        
    <p class="font-weight-regular">Contact Phone number</p>
    <p class="font-weight-regular">Contact Email address</p>
    <p class="font-weight-regular">Comments</p>
  </div>



     
    
</template>

<script>
export default {
 
}
</script>

<style scoped>

</style>
