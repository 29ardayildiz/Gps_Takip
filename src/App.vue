<template>
  <div id="app">
    <LocationSelector @location-selected="onLocationChange" />
    <MapComponent :currentPosition="currentPosition" />
  </div>
</template>

<script>
import LocationSelector from './components/LocationSelector.vue';
import MapComponent from './components/MapComponent.vue';
import axios from 'axios';

export default {
  components: {
    LocationSelector,
    MapComponent,
  },
  data() {
    return {
      locations: [],
      currentPositionIndex: 0,
      currentPosition: { lat: 0, lng: 0 },
      token: '**********************************',
      selectedIMEI: '860147052825369', // Varsayılan IMEI numarası
    };
  },
  async mounted() {
    await this.fetchData();
    this.startTracking();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get(`/api/Api/Default/GetGPSLocation?imei=${this.selectedIMEI}`, {
          headers: {
            'Authorization': `Bearer ${this.token}`,
          },
        });
        this.locations = response.data.map(location => ({
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon),
        }));
        this.currentPositionIndex = 0;
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    },
    async onLocationChange(selectedIMEI) {
      this.selectedIMEI = selectedIMEI;
      await this.fetchData();
    },
    startTracking() {
      setInterval(() => {
        if (this.currentPositionIndex < this.locations.length) {
          this.currentPosition = this.locations[this.currentPositionIndex];
          this.currentPositionIndex++;
        }
      }, 3000);
    },
  },
};
</script>

<style>
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
  font-family: 'Poppins', sans-serif;
  background-color: #f5f7fa;
}
</style>
