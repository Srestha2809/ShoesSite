<template>
  <div class="text-center q-mt-md">
    <img :src="`cart.png`" width="100" height="100" />
    <div class="text-h4 text-deep-orange-8">Finding 3 Closest Branches</div>
    <!-- <div class="text-h6">show map with marker</div> -->
    <div>
      <q-input
        class="q-ma-lg text-h5"
        placeholder="enter current address"
        id="address"
        v-model="state.address"
      />
      <br />
    </div>
    <q-btn
      label="Find 3"
      @click="genMap"
      class="q-mb-md text-deep-orange-8"
      style="width: 30vw"
    />
    <div
      style="height: 50vh; width: 90vw; margin-left: 5vw; border: solid"
      ref="mapRef"
      v-show="state.showmap === true"
    ></div>
  </div>
</template>
<script>
import { ref, reactive } from "vue";
import { fetcher } from "../utils/apiutil";
export default {
  name: "StoreLocator",
  setup() {
    const mapRef = ref(null);
    let state = reactive({
      status: "",
      address: "",
      showmap: false,
    });
    const genMap = async () => {
      try {
        state.showmap = true;
        const tt = window.tt;
        let url = `https://api.tomtom.com/search/2/geocode/${state.address}.json?key=jQNw3b3bhpfAaXRrqsw1CKirwWHIkrmi`;
        let response = await fetch(url);
        let payload = await response.json();
        let lat = payload.results[0].position.lat;
        let lon = payload.results[0].position.lon;
        let map = tt.map({
          key: "s7fBdsAIDtd52zxetXkaNSp6Ts2jxruG",
          container: mapRef.value,
          source: "vector/1/basic-main",
          center: [lon, lat],
          zoom: 8,
        });

        map.addControl(new tt.FullscreenControl());
        map.addControl(new tt.NavigationControl());
        let threeBranches = await fetcher(`branch/${lat}/${lon}`);
        console.log(threeBranches);
        threeBranches.forEach((branch) => {
          let marker = new tt.Marker()
            .setLngLat([branch.longitude, branch.latitude])
            .addTo(map);
          let popupOffset = 25;
          let popup = new tt.Popup({ offset: popupOffset });
          popup.setHTML(
            `<div id="popup">Store#: ${branch.id}</div><div>${branch.street}, ${
              branch.city
            }
            <br/>${branch.distance.toFixed(2)} km</div>`
          );
          marker.setPopup(popup);
        });
      } catch (err) {
        state.status = err.message;
      }
    };
    return {
      mapRef,
      state,
      genMap,
    };
  },
};
</script>