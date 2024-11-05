<template>
  <GMapMap
    ref="map"
    :center="currentPosition"
    :zoom="15"
    style="width: 100%; height: 85vh; border-radius: 12px;"
  >
    <GMapMarker :position="currentPosition" />
    
    <GMapPolyline 
      :path="path" 
      strokeColor="#d43352"
      :strokeOpacity="1" 
      :strokeWeight="5" 
    />
  </GMapMap>
</template>

<script>
import { GMapMap, GMapMarker, GMapPolyline } from "@fawmi/vue-google-maps";

export default {
  components: {
    GMapMap,
    GMapMarker,
    GMapPolyline,
  },
  props: {
    currentPosition: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      path: [], 
    };
  },
  watch: { 
    currentPosition(newPosition) {
      this.addPositionToPath(newPosition);
    },
  },
  methods: {
    addPositionToPath(position) {
      if (!position || typeof position.lat !== 'number' || typeof position.lng !== 'number') {
        console.warn('Geçersiz konum:', position);
        return;
      }

      this.path = [...this.path, { lat: position.lat, lng: position.lng }];
      console.log('Path:', this.path); 
    },
  },
};
</script>

<style scoped>
GMapMap {
  border-radius: 12px;
  transition: transform 0.5s ease;
}

GMapMap:hover {
  transform: scale(1.02);
}
</style>
