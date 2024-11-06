<template>
  <div style="position: relative;">
    <GMapMap
      ref="map"
      :center="currentPosition"
      :zoom="15"
      style="width: 100%; height: 85vh; border-radius: 12px;"
    >
      <GMapMarker 
        v-for="(position, index) in path.slice(0, -1)" 
        :key="index"
        :position="position"
        :icon="greyIcon"
      />

      <GMapMarker 
        :position="currentPosition" 
        :icon="redIcon"
      />
    </GMapMap>

    <div class="legend">
      <div class="legend-item">
        <span class="legend-icon" style="background-color: #0000FF;"></span> Geçmiş Konum
      </div>
      <div class="legend-item">
        <span class="legend-icon-arrow" :style="{ backgroundImage: 'url(' + require('@/assets/marker.png') + ')' }"></span> Son Konum
      </div>
    </div>
  </div>
</template>

<script>
/* global google */
import { GMapMap, GMapMarker } from "@fawmi/vue-google-maps";

export default {
  components: {
    GMapMap,
    GMapMarker,
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
      greyIcon: null, 
      redIcon: null, 
    };
  },
  watch: { 
    currentPosition(newPosition) {
      this.addPositionToPath(newPosition);
    },
  },
  mounted() {
    if (window.google && window.google.maps) {
      this.greyIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#0000FF',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 7
      };
      
      this.redIcon = {
        url: require('@/assets/marker.png'), 
        scaledSize: new google.maps.Size(30, 30), 
      };
    }
  },
  methods: {
    addPositionToPath(position) {
      if (!position || typeof position.lat !== 'number' || typeof position.lng !== 'number') {
        console.warn('Geçersiz konum:', position);
        return;
      }

      this.path.push({ lat: position.lat, lng: position.lng });
      this.path = [...this.path]; 
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

.legend {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  font-size: 14px;
  display: flex;
  flex-direction: column;
}

.legend-item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 5px;
}

.legend-icon {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 11px; 
}

.legend-icon-arrow {
  width: 20px;
  height: 20px;
  background-size: cover;
  margin-right: 8px; 
}
</style>
