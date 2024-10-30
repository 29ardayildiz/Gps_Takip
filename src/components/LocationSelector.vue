<template>
  <div class="location-selector">
    <label for="locationSelector">
      <i class="fas fa-map-marker-alt"></i> Bir Konum Seçin:
    </label>
    <select id="locationSelector" v-model="selectedLocation" @change="onLocationChange">
      <option value="860147052825369">Konum 1</option>
      <option value="860147052825370">Konum 2</option>
      <option value="860147052825371">Konum 3</option>
    </select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLocation: '860147052825369', 
    };
  },
  methods: {
    onLocationChange() {
      this.$emit('location-selected', this.selectedLocation);
    },
  },
};
</script>

<style scoped>
.location-selector {
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  margin: 15px auto;
  width: 90%;
  max-width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

label {
  font-size: 18px;
  font-weight: 500;
  color: #2c3e50;
}

#locationSelector {
  padding: 12px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  background-color: #f0f0f0;
  color: #2c3e50;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

#locationSelector:focus {
  background-color: #e2e6ea;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}
</style>
