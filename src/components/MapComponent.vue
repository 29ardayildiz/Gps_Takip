<template>
  <div style="position: relative; width: 100%; height: 85vh;">
    <div id="map" style="width: 100%; height: 100%; border-radius: 12px;"></div>
    <div class="legend">
      <div class="legend-item">
        <span class="legend-icon marker-icon"></span> Son Konum
      </div>
      <div class="legend-item">
        <span class="legend-icon point-icon"></span> Geçmiş Konum
      </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  props: {
    currentPosition: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      map: null,
      path: [], // Konum geçmişi
      currentMarker: null,
    };
  },
  watch: {
    currentPosition(newPosition) {
      this.updateMap(newPosition);
    },
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      this.map = L.map("map").setView([0, 0], 15);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);
    },
    updateMap(position) {
      if (!position || typeof position.lat !== "number" || typeof position.lng !== "number") {
        console.warn("Geçersiz konum:", position);
        return;
      }

      if (this.path.length > 0) {
        const lastPosition = this.path[this.path.length - 1];
        L.circleMarker(lastPosition, {
          radius: 3,
          color: "#0000FF",
          fillColor: "#0000FF",
          fillOpacity: 1,
        }).addTo(this.map);
      }

      if (this.currentMarker) {
        this.map.removeLayer(this.currentMarker);
      }

      this.currentMarker = L.marker([position.lat, position.lng], {
        icon: L.icon({
          iconUrl: require('@/assets/marker.png'),
          iconSize: [30, 30],
        }),
      }).addTo(this.map);

      this.path.push([position.lat, position.lng]);
      this.map.panTo([position.lat, position.lng]);
    },
  },
};
</script>

<style scoped>

#map {
  border-radius: 12px;
  transition: transform 0.5s ease;
}

#map:hover {
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
  z-index: 1000;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.legend-icon {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 10px;
}

.marker-icon {
  background-image: url('@/assets/marker.png');
  background-size: cover;
  width: 20px;
  height: 20px;
  border-radius: 0;
}

.point-icon {
  background-color: #0000FF;
  border: 2px solid #0000FF;
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
</style>
