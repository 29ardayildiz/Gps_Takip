<template>
    <div class="file-selector">
      <label for="csvSelector">
        <i class="fas fa-map-marker-alt"></i> Bir Güzergah Seçin:
      </label>
      <select id="csvSelector" v-model="selectedCSV" @change="onCSVChange">
        <option value="ayranci1.csv">Ayrancı 1</option>
        <option value="ayranci2.csv">Ayrancı 2</option>
        <option value="ayranci3.csv">Ayrancı 3</option>
        <option value="gps_data.csv">Deneme 1</option>
        <option value="gps_data2.csv">Deneme 2</option>
      </select>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedCSV: "ayranci1.csv",
      };
    },
    methods: {
      onCSVChange() {
        this.$emit("csv-selected", this.selectedCSV);
      },
    },
  };
  </script>
  
  <style scoped>
  .file-selector {
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
  
  #csvSelector {
    padding: 12px;
    font-size: 16px;
    border-radius: 8px;
    border: none;
    background-color: #f0f0f0;
    color: #2c3e50;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }
  
  #csvSelector:focus {
    background-color: #e2e6ea;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
  </style>
  