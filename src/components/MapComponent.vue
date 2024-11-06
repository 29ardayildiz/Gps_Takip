
<template>
  <GMapMap
    ref="map"
    :center="currentPosition"
    :zoom="15"
    style="width: 100%; height: 85vh; border-radius: 12px;"
  >
    <!-- Geçmiş konumları gri markerlarla göster -->
    <GMapMarker 
      v-for="(position, index) in path.slice(0, -1)" 
      :key="index"
      :position="position"
      :icon="greyIcon"
      
    />

    <!-- Son konumu kırmızı marker ile göster -->
    <GMapMarker 
      :position="currentPosition" 
      :icon="redIcon"
    />
  </GMapMap>
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
      path: [], // Tüm geçmiş konumları tutmak için dizi
      greyIcon: null, // Gri icon referansı
      redIcon: null, // Kırmızı icon referansı
    };
  },
  watch: { 
    currentPosition(newPosition) {
      this.addPositionToPath(newPosition);
    },
  },
  mounted() {
    // google.maps yüklendikten sonra ikonları ayarla
    if (window.google && window.google.maps) {
      this.greyIcon = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: '#0000FF',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 7
      };
      
      this.redIcon = {
        path: google.maps.SymbolPath.GMapMarker,
        fillColor: '#FF0000',
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 7
      };
    }
  },
  methods: {
    addPositionToPath(position) {
      // Geçersiz konumları filtreleme
      if (!position || typeof position.lat !== 'number' || typeof position.lng !== 'number') {
        console.warn('Geçersiz konum:', position);
        return;
      }

      // Yeni konumu path listesine ekle
      this.path.push({ lat: position.lat, lng: position.lng });
      this.path = [...this.path]; // Reaktif sistem için path'i güncelle
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
